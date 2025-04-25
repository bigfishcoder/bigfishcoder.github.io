mixins.highlight = {
    data() {
        return { copying: false };
    },
    created() {
        hljs.configure({ 
            ignoreUnescapedHTML: true,
            languages: ['javascript', 'html', 'css', 'python', 'bash'] // 明确指定支持的语言
        });
        this.renderers.push(this.highlight);
    },
    methods: {
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        highlight() {
            // 添加延迟确保DOM完全加载
            setTimeout(() => {
                let codes = document.querySelectorAll("pre code");
                if (codes.length === 0) {
                    codes = document.querySelectorAll("pre");
                }
                
                for (let i of codes) {
                    let code = i.textContent;
                    let language = [...i.classList].find(cls => cls.startsWith('language-')) || 'plaintext';
                    language = language.replace('language-', '');
                    
                    let highlighted;
                    try {
                        highlighted = hljs.highlight(code, { language }).value;
                    } catch (e) {
                        console.warn(`Highlight error for ${language}:`, e);
                        highlighted = hljs.highlightAuto(code).value;
                    }
                    
                    let pre = i.tagName === 'PRE' ? i : i.parentElement;
                    pre.innerHTML = `
                    <div class="code-content hljs">${highlighted}</div>
                    <div class="language">${language}</div>
                    <div class="copycode">
                        <i class="fa-solid fa-copy fa-fw"></i>
                        <i class="fa-solid fa-check fa-fw"></i>
                    </div>
                    `;
                    
                    let content = pre.querySelector(".code-content");
                    if (hljs.lineNumbersBlock) {
                        hljs.lineNumbersBlock(content, { singleLine: true });
                    }
                    
                    let copycode = pre.querySelector(".copycode");
                    copycode.addEventListener("click", async () => {
                        if (this.copying) return;
                        this.copying = true;
                        copycode.classList.add("copied");
                        await navigator.clipboard.writeText(code);
                        await this.sleep(1000);
                        copycode.classList.remove("copied");
                        this.copying = false;
                    });
                }
            }, 100);
        },
    },
};