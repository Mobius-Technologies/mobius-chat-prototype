"use server"


//TODO: FIX FOR VERCEL/SERVER SIDE (CHROME ERROR)
import { NextResponse } from 'next/server';

import puppeteer from 'puppeteer'



export async function POST(req, res) {
    console.log(req.method)
    const search = new URLSearchParams(req.url)
    const { protocol, host } = req.headers;
    const fullUrl = `${protocol}://${host}${req.url}`;
    const newURL = new URL(fullUrl);
    const searchParams = new URLSearchParams(newURL.search);



    const url = searchParams.get('url');
    const browser = await puppeteer.launch({
      
      headless: true,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(url);
    const buffer = await page.screenshot({ type: 'png' });
    await browser.close();

    console.log(buffer)

    const base64Image = buffer.toString('base64');

    return NextResponse.json({image: base64Image})
}