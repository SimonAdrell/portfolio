<script lang="ts">
    export let typingTexts: string[];
    export function animateTyping(node: HTMLElement, texts: string[]) {
        let textsToType = texts;

        let textsIndex = 0;
        let charIndex = 0;
        let currentText = "";

        const updateInnerHTML = (isTyping?: boolean) => {
            // Always include the zero-width space and conditionally add the text and cursor
            node.innerHTML = "&#8203;" + currentText + (isTyping ? "|" : "");
        };

        const blinkingCursor = () => {
            if (currentText.endsWith("|")) {
                currentText = currentText.slice(0, -1);
            } else {
                currentText += "|";
            }
            updateInnerHTML();
        };

        // Blinking cursor effect
        const waitingEffect = (delay: number) => {
            const interval = setInterval(blinkingCursor, 500);

            setTimeout(() => {
                clearInterval(interval); // Stop blinking
                if (currentText.endsWith("|")) {
                    // Remove cursor if it's still there
                    currentText = currentText.slice(0, -1);
                }
                updateInnerHTML();
            }, delay);
        };

        // Typing animation effect
        const typeEffect = () => {
            const currentString = textsToType[textsIndex];
            const delay = currentString[charIndex] === " " ? 75 : 100; // Faster delay for spaces

            if (charIndex < currentString.length) {
                currentText += currentString[charIndex++];
                setTimeout(typeEffect, delay);
            } else {
                waitingEffect(3000);
            }

            updateInnerHTML(true);
        };
        // Start typing effect
        setTimeout(typeEffect, 500);

        return {
            onDestroy() {},
            update(newTexts: string[]) {
                textsToType = newTexts;
            },
        };
    }
</script>

<span class="" use:animateTyping={typingTexts}> &nbsp; </span>
