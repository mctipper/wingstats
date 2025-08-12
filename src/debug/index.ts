// root style
import '../style.css'
// debug style
import './style.css'

// helper types to simplify code
type DebugModule = {
    name: string;
    run: () => unknown | Promise<unknown>;
};

type DebugCategory = {
    category: string;
    entries: DebugModule[];
};

// only explicitly import the debug.ts modules
const debugModules = {
    data: import.meta.glob('./data/*.debug.ts'),
    dice: import.meta.glob('./dice/*.debug.ts'),
    draw: import.meta.glob('./draw/*.debug.ts'),
};

async function loadModules(): Promise<DebugCategory[]> {
    const categories = Object.entries(debugModules);

    // builds a neat object with the name and .debug method to execute for each module
    const loaded = await Promise.all(
        categories.map(async ([category, modules]) => {
            const entries = await Promise.all(
                Object.entries(modules).map(async ([path, loader]) => {
                    const mod: any = await loader();
                    return {
                        name: path.split('/').pop()?.replace('.debug.ts', '') ?? 'unknown',
                        run: mod.debug,
                    };
                })
            );
            return { category, entries };
        })
    );

    return loaded;
}

// draw the resulting list with 'categories'
function renderModuleList(modules: DebugCategory[]) {
    const container = document.getElementById('debug-module-list')!;
    container.innerHTML = '';

    for (const { category, entries } of modules) {
        // create a section for each category with header / list for each debug module
        const section = document.createElement('section');

        const heading = document.createElement('h2');
        heading.textContent = category;
        section.appendChild(heading);

        const list = document.createElement('ul');

        for (const { name, run } of entries) {
            // allow the run the debug function for each debug module when clicked
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = name;
            link.href = '#';
            link.onclick = async (e) => {
                e.preventDefault();
                const result = await run();
                renderDebugResult(`${category}/${name}`, result);
            };
            item.appendChild(link);
            list.appendChild(item);
        }

        section.appendChild(list);
        container.appendChild(section);
    }
}

// when results are objects, just display the raw values
function renderDebugResult(label: string, result: unknown) {
    const container = document.getElementById('debug-result')!;
    container.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = `Result: ${label}`;
    container.appendChild(heading);

    const pre = document.createElement('pre');
    // 'any' structure explicitly permitted here hence 'unknown' type
    pre.textContent = formatResult(result);
    container.appendChild(pre);
}

// convert whatever result given to a String, and parse JSON is it can
function formatResult(result: unknown): string {
    if (typeof result === 'string') return result;
    try {
        return JSON.stringify(result, null, 2);
    } catch {
        return String(result);
    }
}

// init
loadModules().then(renderModuleList);
