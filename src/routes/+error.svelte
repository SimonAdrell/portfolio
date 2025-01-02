<script lang="ts">
    import { page } from "$app/stores";
    import mysadfaceSvg from "$lib/assets/sadFace.png";
    import { Send } from "lucide-svelte";
    import { onMount } from "svelte";
    import { backOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import * as m from "$lib/paraglide/messages";
    let ready = false;
    onMount(() => (ready = true));
</script>

<div class="flex w-screen items-center align-middle">
    <div class="items-center flex">
        {#if ready}
            <header
                in:fly={{
                    y: 70,
                    delay: 10,
                    easing: backOut,
                }}
            >
                <div class="w-screen place-items-center">
                    <div>
                        <img
                            src={mysadfaceSvg}
                            alt="Sad face"
                            class="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"
                        />
                    </div>
                </div>
                <h1
                    class=" text-8xl w-screen p-6 text-tertiary dark:text-tertiaryDark md:text-9xl lg:text-10xl text-center"
                >
                    {$page.status}
                    {$page.error?.message}
                </h1>
                <div class="text-2xl w-screen items-center place-items-center">
                    <a href="/contact" class="flex items-center">
                        <button
                            aria-label="Contact me"
                            type="button"
                            class="bg-accent p-3 rounded-2xl flex items-center"
                        >
                            <span>
                                <Send></Send>
                            </span>
                            <span class="pl-3"> {m.ctaStart()} </span></button
                        >
                    </a>
                </div>
            </header>
        {/if}
    </div>
</div>
