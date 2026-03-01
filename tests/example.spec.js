// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

const root = path.resolve(__dirname, '..');
// @ts-ignore
function toLocal(relativePath) {
  return pathToFileURL(path.join(root, relativePath)).href;
}

test('La página de inicio debería cargarse con el título correcto [TuTarot :: Inicio]', async ({ page }) => {
  await page.goto(toLocal('index.html'));
  await expect(page).toHaveTitle(/TuTarot :: Inicio/i);
});

test('Los enlaces de navegación deben llevar a las páginas correctas', async ({ page }) => {
  await page.goto(toLocal('index.html'));

  await page.click('nav >> text=Lecturas');
  await page.waitForURL(/lecturas\.html$/);

  await page.click('nav >> text=Sobre Nosotros');
  await page.waitForURL(/sobre-nosotros\.html$/);

  await page.click('nav >> text=Nuestras Cartas');
  await page.waitForURL(/nuestras-cartas\.html$/);
});

test('El botón deslizante "Amor" dirige a la página del tarot del amor', async ({ page }) => {
  await page.goto(toLocal('index.html'));
  
  await page.evaluate(() => {
    const input = document.getElementById('slideTwo');
    // @ts-ignore
    if (input) input.checked = true;
  });
  await page.click('.secondslide .love-button');
  await page.waitForURL(/tarot-love\.html$/);
});


test('En la página de lecturas se muestran las tres opciones de temas', async ({ page }) => {
  await page.goto(toLocal('pages/lecturas.html'));
  await expect(page.locator('h2', { hasText: 'Lecturas' })).toBeVisible();
  await expect(page.locator('.tarot-option-title', { hasText: 'Amor' })).toBeVisible();
  await expect(page.locator('.tarot-option-title', { hasText: 'Trabajo' })).toBeVisible();
  await expect(page.locator('.tarot-option-title', { hasText: 'Salud y Bienestar' })).toBeVisible();
});

for (const [file, heading] of [
  ['pages/tarot-love.html', 'Tarot para el Amor'],
  ['pages/tarot-work.html', 'Tarot para el Trabajo'],
  ['pages/tarot-health-wellBeing.html', 'Tarot para la Salud y Bienestar'],
]) {
  test(`Página ${file} tiene el título esperado`, async ({ page }) => {
    await page.goto(toLocal(file));
    await expect(page.locator('h1')).toContainText(heading);
  });
}
