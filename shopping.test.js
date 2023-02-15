const Browser = require("./Browser");
const browser = new Browser();
const timeout = 20000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('http://localhost:8080/');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);

test("Initially has a header", async () => {
    const element = await browser.getElementByCss('h1');
    const tagName = await element.getTagName();
    expect(tagName).toBe('h1');
});

test("Click on List", async () => {
    const clickButton = await browser.getElement("action-1");
    await clickButton.click();
    const itemText = await browser.getElement("item-1")
    const text = await itemText.getText()


    expect(text).toBe("A dozen eggs");
});

test("Create Brown bread", async () => {
    const searchBar = await browser.getElement("new-item");
    const createButton = await browser.getElement("create-item");

    await searchBar.sendKeys("Brown Bread");
    await createButton.click();

    const itemAdded = await browser.getElement("item-1");
    const text = await itemAdded.getText();
    expect(text).toBe("Brown Bread");
});
