"use server"
/*
const puppeteer = require('puppeteer');


export default async function fetchImg(url){
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ type: 'png' });
    await browser.close();

    console.log('runs')
    console.log(screenshot)

    return JSON.parse(JSON.stringify(screenshot))
}*/