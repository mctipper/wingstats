import { birdsRollDiceNotInTheBirdfeeder, getRollDiceNotInTheBirdfeederActivation } from "@logic/diceActivations/rollDiceNotInTheBirdfeeder";
import { renderRollDiceNotInBirdfeederResult } from "@render/dice/renderRollDiceNotInBirdfeeder"


const routes: Record<string, () => Promise<void>> = {
    '/': () => renderLayout('home'),
    '/dice/roll-dice-not-in-the-birdfeeder': async () => {
        await renderLayout('dice/roll-dice-not-in-the-birdfeeder')
        const rc = document.getElementById('results-container')
        console.log('found you')
        if (rc) {
            const results = getRollDiceNotInTheBirdfeederActivation(birdsRollDiceNotInTheBirdfeeder)
            results.forEach(result => {
                const resultCard = renderRollDiceNotInBirdfeederResult(result)
                rc.appendChild(resultCard)
            });
        }
    },
    // TODO more routes
}

function getRoutePath(): string {
    return location.pathname.replace('/wingstats', '') || '/'
}

async function renderLayout(name: string) {
    const res = await fetch(`/wingstats/layouts/${name}.html`)
    const html = await res.text()
    document.getElementById('layout-root')!.innerHTML = html
}

function handleRoute() {
    const route = routes[getRoutePath()]
    if (route) route()
    else document.getElementById('layout-root')!.innerHTML = '<p>404: Page not found</p>'
}

window.addEventListener('DOMContentLoaded', handleRoute)
window.addEventListener('popstate', handleRoute)

document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/wingstats/')) {
        e.preventDefault()
        const href = target.getAttribute('href')!
        history.pushState({}, '', href)
        handleRoute()
    }
})
