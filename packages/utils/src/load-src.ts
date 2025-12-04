import { AnyObject } from "./type-utils";

interface IOpt {
    id?: string,
    text?: string,
    url?: string,
    debug?: boolean
    allowExternal?: boolean
    cache?: boolean
    async?: boolean
    type?: 'text/css' | 'text/javascript'
    charset?: string

}
type TMixOpt = IOpt | string
export function create_load_src() {
    var cache: AnyObject<Promise<Element>> = {};
    var head_el = document.getElementsByTagName("head")[0] || document.documentElement;

    function exec(options: TMixOpt, node: HTMLHeadElement) {
        let opt: IOpt
        if (typeof options === "string") {
            opt = {
                url: options,
                debug: false
            };
        } else {
            opt = options
        }

        var cacheId = opt.id || opt.url!;
        var cacheEntry = cache[cacheId];

        if (cacheEntry) {
            if (!!opt.debug) {
                console.log("load-js: cache hit", cacheId);
            }
            return cacheEntry;
        } else if (opt.allowExternal !== false) {
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

        var pending = (opt.url ? loadScript : runScript)(node, createEl(opt));

        if (cacheId && opt.cache !== false) {
            cache[cacheId] = pending;
        }

        return pending;
    }

    function runScript(head: HTMLHeadElement, el: HTMLElement) {
        head.appendChild(el);
        return Promise.resolve(el);
    }

    function loadScript(head: HTMLHeadElement, el: HTMLElement) {
        return new Promise<HTMLElement>(function (resolve, reject) {
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
            el.onload = el.onreadystatechange = function () {
                //@ts-ignore
                if (!done && (!el.readyState || el.readyState === "loaded" || el.readyState === "complete")) {
                    done = true;

                    // Handle memory leak in IE
                    //@ts-ignore
                    el.onload = el.onreadystatechange = null;
                    resolve(el);
                }
            };

            el.onerror = reject;

            head.appendChild(el);
        });
    }

    function createEl(opt: IOpt) {
        if (opt.url?.endsWith('css')) {
            return createLink(opt)
        }
        if (opt.type === 'text/css') {
            return createStyle(opt)
        }
        return createScript(opt)
    }
    function createScript(options: IOpt) {
        var el = document.createElement("script");
        el.charset = options.charset || "utf-8";
        el.type = options.type || "text/javascript";
        el.async = !!options.async;
        el.id = options.id || options.url!;
        //@ts-ignore
        el.loadJS = "watermark";

        if (options.url) {
            el.src = options.url;
        }

        if (options.text) {
            el.text = options.text;
        }

        return el;
    }
    function createLink(options: IOpt) {
        var el = document.createElement("link");
        el.charset = options.charset || "utf-8";
        el.type = options.type || "text/css";
        el.id = options.id || options.url!;
        el.rel = 'stylesheet'
        //@ts-ignore
        el.loadJS = "watermark";

        if (options.url) {
            el.href = options.url;
        }
        console.log('createLink', { options, el })

        return el;
    }
    function createStyle(options: IOpt) {
        var el = document.createElement("style");
        el.id = options.id || options.text!;
        //@ts-ignore
        el.loadJS = "watermark";

        if (options.text) {
            el.textContent = options.text;
        }

        return el;
    }

    function getScriptById(id?: string) {
        var el = id && document.getElementById(id);

        //@ts-ignore
        if (el && el.loadJS !== "watermark") {
            console.warn("load-js: duplicate script with id:", id);
            return el;
        }
    }

    function getScriptByUrl(url?: string) {
        var el = url && document.querySelector("script[src='" + url + "']");
        //@ts-ignore
        if (el && el.loadJS !== "watermark") {
            console.warn("load-js: duplicate script with url:", url);
            return el;
        }
    }

    return function load(items: TMixOpt | TMixOpt[], node = head_el) {
        return items instanceof Array ?
            Promise.all(items.map(_ => exec(_, node))) :
            exec(items, node);
    }
}

export function load_src(items: TMixOpt, node?: HTMLHeadElement): Promise<Element>;
export function load_src(items: TMixOpt[], node?: HTMLHeadElement): Promise<Element[]>;

export function load_src<T extends TMixOpt | TMixOpt[],>(items: T, node?: HTMLHeadElement) {
    const load_src_ = create_load_src()
    return load_src_(items, node)
};


