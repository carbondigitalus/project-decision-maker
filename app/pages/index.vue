<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="p-8 rounded-lg shadow-lg w-1/2 flex-col items-center justify-center">
            <h1 class="capitalize text-3xl font-bold mb-4 text-center">Project Decision Maker</h1>
            <p class="mb-6 mx-auto text-white text-lg w-1/2">
                The classic project management dilemma: you can pick any two, but never all three. Select your
                priorities and discover what you'll have to sacrifice.
            </p>
            <div class="mx-auto w-60">
                <form>
                    <label class="relative flex justify-between items-center group p-2 text-xl text-white">
                        Good
                        <input
                            type="checkbox"
                            v-model="formState.good"
                            class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        />
                        <span
                            class="w-16 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8 group-hover:after:translate-x-1"
                        ></span>
                    </label>
                    <label class="relative flex justify-between items-center group p-2 text-xl text-white">
                        Fast
                        <input
                            type="checkbox"
                            v-model="formState.fast"
                            class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        />
                        <span
                            class="w-16 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8 group-hover:after:translate-x-1"
                        ></span>
                    </label>
                    <label class="relative flex justify-between items-center group p-2 text-xl text-white">
                        Cheap
                        <input
                            type="checkbox"
                            v-model="formState.cheap"
                            class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        />
                        <span
                            class="w-16 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8 group-hover:after:translate-x-1"
                        ></span>
                    </label>
                </form>
            </div>
            <div class="mt-6 relative min-h-[200px] mx-auto w-2/3">
                <div
                    v-if="formState.good && formState.cheap"
                    class="absolute inset-0"
                >
                    <h2 class="mb-1 text-2xl">Good-Cheap (Sacrificing Fast)</h2>
                    <p class="text-white text-lg">
                        Exceptional creative and strategic work within budget constraints requires patience. Our team
                        will craft compelling campaigns, optimize every touchpoint, and A/B test until performance
                        peaks—but on a sustainable timeline. Budget-friendly retainers mean scheduled sprints, shared
                        resources across clients, and strategic phasing of deliverables. Expect 8-12 week launch windows
                        instead of 3-4. Your brand deserves excellence, and excellence can't be rushed when margins are
                        tight.
                    </p>
                </div>
                <div
                    v-if="formState.good && formState.fast"
                    class="absolute inset-0"
                >
                    <h2 class="mb-1 text-2xl">Good-Fast (Sacrificing Cheap)</h2>
                    <p class="text-white text-lg">
                        You need a high-performing campaign launched immediately? Premium pricing is non-negotiable.
                        Rush timelines mean dedicated teams working overtime, expedited design reviews, and priority
                        access to our senior strategists. We'll pull developers from other projects, fast-track content
                        approval workflows, and leverage premium tools for rapid deployment. Your ROI will be strong,
                        but your retainer will reflect the urgency and quality you're demanding.
                    </p>
                </div>
                <div
                    v-if="formState.fast && formState.cheap"
                    class="absolute inset-0"
                >
                    <h2 class="mb-1 text-2xl">Fast-Cheap (Sacrificing Good)</h2>
                    <p class="text-white text-lg">
                        Need a campaign live by Monday without blowing your budget? We'll get you there, but expect
                        template-driven solutions and minimal customization. Stock photography, pre-built landing pages,
                        basic SEO, and out-of-the-box analytics. Testing will be light, refinements will be minimal, and
                        ongoing optimization won't be included. You'll have a functional digital presence that checks
                        boxes, but don't expect award-winning creative or standout performance metrics.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';

const formState = reactive({
    good: false,
    fast: false,
    cheap: false,
});

const selectedCount = computed(() => {
    return (formState.good ? 1 : 0) + (formState.fast ? 1 : 0) + (formState.cheap ? 1 : 0);
});

// Track the order of selections
const selectionOrder = reactive<string[]>([]);

// Watch for changes and enforce "pick 2" rule
watch(formState, (newState) => {
    // Update selection order
    if (newState.good && !selectionOrder.includes('good')) {
        selectionOrder.push('good');
    } else if (!newState.good) {
        const index = selectionOrder.indexOf('good');
        if (index > -1) selectionOrder.splice(index, 1);
    }

    if (newState.fast && !selectionOrder.includes('fast')) {
        selectionOrder.push('fast');
    } else if (!newState.fast) {
        const index = selectionOrder.indexOf('fast');
        if (index > -1) selectionOrder.splice(index, 1);
    }

    if (newState.cheap && !selectionOrder.includes('cheap')) {
        selectionOrder.push('cheap');
    } else if (!newState.cheap) {
        const index = selectionOrder.indexOf('cheap');
        if (index > -1) selectionOrder.splice(index, 1);
    }

    // If more than 2 selected, uncheck the oldest one
    if (selectedCount.value > 2 && selectionOrder.length > 2) {
        const oldest = selectionOrder.shift(); // Remove first (oldest) item
        if (oldest) {
            formState[oldest as keyof typeof formState] = false;
        }
    }
});
</script>
