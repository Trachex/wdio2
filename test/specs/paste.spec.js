describe("Webdriver suite", () => {

    it("Should create new bash paste", async () => {
        await browser.url("https://pastebin.com/");
        const text = 'git config --global user.name  "New Sheriff in Town"\ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force';

        // Setting required text
        const textarea = await $('textarea#postform-text');
        textarea.click();
        await textarea.setValue(text);

        // Setting Bash option
        const highlight = await $('/html/body/div[1]/div[2]/div[1]/div[2]/div/form/div[5]/div[1]/div[3]/div');
        highlight.click();
        await browser.pause(200);
        const highlightOpt = await $('/html/body/span[2]/span/span[2]/ul/li[2]/ul/li[1]');
        highlightOpt.click();

        // Setting time option
        const pasteExp = await $('/html/body/div[1]/div[2]/div[1]/div[2]/div/form/div[5]/div[1]/div[4]/div');
        pasteExp.click();
        await browser.pause(300);
        const timeOpt = await $('/html/body/span[2]/span/span[2]/ul/li[3]');
        timeOpt.click();

        // Setting title
        const pasteTitle = await $('//*[@id="postform-name"]');
        pasteTitle.click();
        await pasteTitle.setValue('how to gain dominance among developers');

        // Creating the post
        const createBtn = await $('/html/body/div[1]/div[2]/div[1]/div[2]/div/form/div[5]/div[1]/div[10]/button');
        createBtn.click();
        await browser.pause(500);

        // Checking title and hoghlight options
        const title = await browser.getTitle();
        const highlightRes = await (await $('div.highlighted-code div.top-buttons div.left a.h_800')).getHTML(false);

        // Checking the text
        const curUrl = await browser.getUrl();
        const tmp = curUrl.split('/');
        const postId = tmp[tmp.length - 1];
        await browser.url(`https://pastebin.com/raw/${postId}`);
        const textRes = await (await $('/html/body/pre')).getHTML(false);

        expect(title).toEqual('how to gain dominance among developers - Pastebin.com');
        expect(highlightRes).toEqual('Bash');
        expect(textRes).toEqual(text);
    });
})