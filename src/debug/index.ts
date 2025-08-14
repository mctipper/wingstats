// root style
import '../style.css'
// debug style
import './style.css'

// helper types to simplify code
type DebugModule = {
    name: string;
    run: () => unknown | Promise<unknown>;
};

type DebugSubcategory = {
    subcategory: string;
    entries: DebugModule[];
};

type DebugCategory = {
    category: string;
    subcategories: DebugSubcategory[];
};

// only explicitly import the debug.ts modules
const debugModules = {
    data: import.meta.glob('./data/**/*.debug.ts'),
    dice: import.meta.glob('./dice/**/*.debug.ts'),
    draw: import.meta.glob('./draw/**/*.debug.ts'),
};

async function loadModules(): Promise<DebugCategory[]> {
    const categories = Object.entries(debugModules);

    const loaded = await Promise.all(
        categories.map(async ([category, modules]) => {
            const subcategoryMap = new Map<string, DebugModule[]>();

            await Promise.all(
                Object.entries(modules).map(async ([path, loader]) => {
                    const mod: any = await loader();
                    const parts = path.split('/');
                    const name = parts.pop()?.replace('.debug.ts', '') ?? 'unknown';

                    // get subpath between category and filename
                    const categoryIndex = parts.indexOf(category);
                    const subParts = parts.slice(categoryIndex + 1);
                    const subcategory = subParts.join('/') || 'root';

                    if (!subcategoryMap.has(subcategory)) {
                        subcategoryMap.set(subcategory, []);
                    }

                    subcategoryMap.get(subcategory)!.push({
                        name,
                        run: mod.debug,
                    });
                })
            );

            // subcategories and headers are sorted alphabetically
            const subcategories: DebugSubcategory[] = Array.from(subcategoryMap.entries())
                .map(([subcategory, entries]) => ({
                    subcategory,
                    entries: entries.sort((a, b) => a.name.localeCompare(b.name)),
                }))
                .sort((a, b) => a.subcategory.localeCompare(b.subcategory));


            return { category, subcategories };
        })
    );

    return loaded;
}

// draw the resulting list with 'categories'
function renderModuleList(modules: DebugCategory[]) {
    const container = document.getElementById('debug-module-list')!;
    container.innerHTML = '';

    for (const { category, subcategories } of modules) {
        // create a section for each category with header / list for each debug module
        const section = document.createElement('section');

        const heading = document.createElement('h2');
        heading.textContent = category;
        section.appendChild(heading);

        for (const { subcategory, entries } of subcategories) {
            if (subcategory !== 'root') {
                const subheading = document.createElement('h3');
                subheading.textContent = subcategory;
                section.appendChild(subheading);
            }

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
                    if (subcategory !== 'root') {
                        renderDebugResult(`${category}/${subcategory}/${name}`, result);
                    } else {
                        renderDebugResult(`${category}/${name}`, result);
                    }
                };
                item.appendChild(link);
                list.appendChild(item);
            }

            section.appendChild(list);
        }

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
