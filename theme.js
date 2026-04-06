(function () {
    const html = document.documentElement;
    const KEY = "theme";

    function read() {
        try {
            return localStorage.getItem(KEY);
        } catch (e) {
            return null;
        }
    }

    function write(v) {
        try {
            localStorage.setItem(KEY, v);
        } catch (e) {}
    }

    /* FOUC: apply before paint */
    if (read() === "light") {
        html.classList.remove("dark");
    } else {
        html.classList.add("dark");
    }

    function setup() {
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;

        function syncIcon() {
            btn.textContent = html.classList.contains("dark") ? "dark_mode" : "light_mode";
        }
        syncIcon();

        btn.addEventListener("click", function (e) {
            e.preventDefault();
            var isDark = html.classList.toggle("dark");
            write(isDark ? "dark" : "light");
            syncIcon();
            window.dispatchEvent(
                new CustomEvent("themeChanged", { detail: { theme: isDark ? "dark" : "light" } })
            );
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setup);
    } else {
        setup();
    }
})();
