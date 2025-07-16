import { AnyObject } from "./type-utils";

interface IOpt {
    id?: string,
    text?: string,
    url: string,
    debug?: boolean
    allowExternal?: boolean
    cache?: boolean
    async?: boolean
    type?: string
    charset?: string

}
type TMixOpt = IOpt | string
export function create_load_src() {
    var cache: AnyObject<Promise<Element>> = {};
    var head = document.getElementsByTagName("head")[0] || document.documentElement;

    function exec(options: TMixOpt) {
        let opt: IOpt
        if (typeof options === "string") {
            opt = {
                url: options,
                debug: false
            };
        } else {
            opt = options
        }

        var cacheId = opt.id || opt.url;
        var cacheEntry = cache[cacheId];

        if (cacheEntry) {
            if (!!opt.debug) {
                console.log("load-js: cache hit", cacheId);
            }
            return cacheEntry;
        }
        else if (opt.allowExternal !== false) {
            var el = getScriptById(opt.id) || getScriptByUrl(opt.url);

            if (el) {
                var promise = Promise.resolve(el);

                if (cacheId) {
                    cache[cacheId] = promise;
                }

                return promise;
            }
        }

        if (!opt.url && !opt.text) {
            throw new Error("load-js: must provide a url or text to load");
        }

        var pending = (opt.url ? loadScript : runScript)(head, createScript(opt));

        if (cacheId && opt.cache !== false) {
            cache[cacheId] = pending;
        }

        return pending;
    }

    function runScript(head: HTMLHeadElement, script: HTMLScriptElement) {
        head.appendChild(script);
        return Promise.resolve(script);
    }

    function loadScript(head: HTMLHeadElement, script: HTMLScriptElement) {
        return new Promise<HTMLScriptElement>(function (resolve, reject) {
            // Handle Script loading
            var done = false;

            // Attach handlers for all browsers.
            //
            // References:
            // http://stackoverflow.com/questions/4845762/onload-handler-for-script-tag-in-internet-explorer
            // http://stevesouders.com/efws/script-onload.php
            // https://www.html5rocks.com/en/tutorials/speed/script-loading/
            //
            //@ts-ignore
            script.onload = script.onreadystatechange = function () {
                //@ts-ignore
                if (!done && (!script.readyState || script.readyState === "loaded" || script.readyState === "complete")) {
                    done = true;

                    // Handle memory leak in IE
                    //@ts-ignore
                    script.onload = script.onreadystatechange = null;
                    resolve(script);
                }
            };

            script.onerror = reject;

            head.appendChild(script);
        });
    }

    function createScript(options: IOpt) {
        var script = document.createElement("script");
        script.charset = options.charset || "utf-8";
        script.type = options.type || "text/javascript";
        script.async = !!options.async;
        script.id = options.id || options.url;
        //@ts-ignore
        script.loadJS = "watermark";

        if (options.url) {
            script.src = options.url;
        }

        if (options.text) {
            script.text = options.text;
        }

        return script;
    }

    function getScriptById(id?: string) {
        var script = id && document.getElementById(id);

        //@ts-ignore
        if (script && script.loadJS !== "watermark") {
            console.warn("load-js: duplicate script with id:", id);
            return script;
        }
    }

    function getScriptByUrl(url?: string) {
        var script = url && document.querySelector("script[src='" + url + "']");
        //@ts-ignore
        if (script && script.loadJS !== "watermark") {
            console.warn("load-js: duplicate script with url:", url);
            return script;
        }
    }

    return function load(items: TMixOpt | TMixOpt[]) {
        return items instanceof Array ?
            Promise.all(items.map(exec)) :
            exec(items);
    }
}
const load_src_ = create_load_src()

export function load_src(items: TMixOpt): Promise<Element>;
export function load_src(items: TMixOpt[]): Promise<Element[]>;

export function load_src<T extends TMixOpt | TMixOpt[]>(items: T) {
    return load_src_(items)
};


