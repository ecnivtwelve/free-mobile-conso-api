const express = require('express')
const puppeteer = require('puppeteer');
const app = express()
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
	res.send("This is an API for Free Mobile usage data.");
});

app.get('/conso', (req, res) => {
  console.log("Querying data for " + req.query.user);
	
  let identifiant = req.query.user;
  let pass = req.query.pass;
  
  (async () => {
	const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
	const page = await browser.newPage();
	await page.goto('https://mobile.free.fr/account/conso-et-factures');
	
	await page.type('input[name=login-ident]', identifiant);
	await page.type('input[name=login-pwd]', pass);
	
	await page.click('button[name=bt-login]');
	
	await page.waitForNavigation()
	
	// username
	await page.waitForSelector('.page__title')
	let usernameElement = await page.$('.page__title')
	let usernameValue = await page.evaluate(el => el.textContent, usernameElement)
	let username = usernameValue.slice(8)
	
	// phone
	await page.waitForSelector('.date')
	let phoneElement = await page.$('.date')
	let phoneValue = await page.evaluate(el => el.textContent, phoneElement)
	let phone = phoneValue.split("\n")[1].split(" -")[0].trim()
	
	// data
	await page.waitForSelector('div[data-target=data]')
	let dataIconElement = await page.$('div[data-target=data]')
	let dataElement = await dataIconElement.getProperty('parentNode')
	let dataValue = await page.evaluate(el => el.textContent, dataElement)
	let dataString = dataValue.split("\n");
	
	let dataResult = [{
		"usedMo": parseFloat(dataString[2].trim().split("Mo")[0].replace(',', '.')),
		"totalMo": parseFloat(dataString[3].split("/ ")[1].trim().split("Mo")[0].replace(',', '.')),
		"hors_forfaitEUR": parseFloat(dataString[4].split(" : ")[1].trim().split('€')[0])
	}]
	
	// voix
	  await page.waitForSelector('div[data-target=voix]')
	  let voixIconElement = await page.$('div[data-target=voix]')
	  let voixElement = await voixIconElement.getProperty('parentNode')
	  let voixValue = await page.evaluate(el => el.textContent, voixElement)
	  let voixString = voixValue.split("\n");
	  
	  let voixResult = [{
		  "used": [{
			  "france": voixString[2].split(" : ")[1].trim(),
			  "international": voixString[3].split(" : ")[1].trim()
		  }],
		  "hors_forfaitEUR": parseFloat(voixString[4].split(" : ")[1].trim().split('€')[0])
	  }]
	  
	// sms
	await page.waitForSelector('div[data-target=sms]')
	let smsIconElement = await page.$('div[data-target=sms]')
	let smsElement = await smsIconElement.getProperty('parentNode')
	let smsValue = await page.evaluate(el => el.textContent, smsElement)
	let smsString = smsValue.split("\n");
	
	let smsResult = [{
		"sent" : parseInt(smsString[1].split(" SMS")[0]),
		"hors_forfaitEUR": parseFloat(smsString[2].split(" : ")[1].trim().split('€')[0])
	}]
	
	// mms
	await page.waitForSelector('div[data-target=mms]')
	  let mmsIconElement = await page.$('div[data-target=mms]')
	  let mmsElement = await mmsIconElement.getProperty('parentNode')
	  let mmsValue = await page.evaluate(el => el.textContent, mmsElement)
	  let mmsString = mmsValue.split("\n");
	  
	  let mmsResult = [{
		  "sent" : parseInt(mmsString[2].split(" MMS")[0]),
		  "hors_forfaitEUR": parseFloat(mmsString[3].split(" : ")[1].trim().split('€')[0])
	  }]
	
	// result
	let result = [{
		"first_name": username,
		"phone_number": phone,
		"conso" : [{
			"data": dataResult,
			"voix": voixResult,
			"sms": smsResult,
			"mms": mmsResult
		}]
	}]
	
	await browser.close();
	res.send(result)
  })();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
