(function () {
    const supported = new Set(["ko", "en"]);

    function preferredLanguage() {
        const saved = window.localStorage.getItem("creamcal_lang");
        if (supported.has(saved)) return saved;

        const fallback = document.documentElement.dataset.defaultLang || "ko";
        return supported.has(fallback) ? fallback : "ko";
    }

    function setLanguage(lang) {
        const nextLang = supported.has(lang) ? lang : "ko";
        document.documentElement.lang = nextLang;
        document.documentElement.dataset.lang = nextLang;
        window.localStorage.setItem("creamcal_lang", nextLang);

        document.querySelectorAll("[data-locale]").forEach((node) => {
            const isActive = node.dataset.locale === nextLang;
            node.classList.toggle("is-active", isActive);
            node.setAttribute("aria-hidden", isActive ? "false" : "true");
        });

        document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
            const isActive = button.dataset.langToggle === nextLang;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }

    window.CreamCalSite = { setLanguage };

    document.addEventListener("DOMContentLoaded", () => {
        setLanguage(preferredLanguage());
        document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
            button.addEventListener("click", () => setLanguage(button.dataset.langToggle));
        });
    });
})();
