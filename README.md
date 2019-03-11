# Newsently 🔎🗞

[![Build Status](https://travis-ci.org/duncandean/news-sentiment.svg?branch=master)](https://travis-ci.org/duncandean/news-sentiment)

## 1️⃣ Introduction 

Newsently is a demo application that queries and displays news articles by keyword and infers an individual sentiment for each article and an average sentiment for the currently loaded total. It uses [NewsAPI](https://newsapi.org/) and [TensorFlow.js](https://www.tensorflow.org/js/). (Specifically the example sentiment analysis model found [here](https://github.com/tensorflow/tfjs-examples/tree/master/sentiment)).

## 2️⃣ Tests and Linting

Linting and unit tests are run on TravisCI and need to be satisfied before changes are merged into the protected `master` branch. Since this app is very small, and no direct user interaction is present other than a few links, the end-to-end testing has been omitted.

## 3️⃣ API Limits

The NewsAPI provides a free tier with only 1000 requests a day. I've done a few things to limit the requests, but extensive refreshing and reuse of the app may, over the period of the day, reach this limit. But namely,

* Articles are loaded in groups of five, with scrolling to the bottom of the page initiating the next paginated load.
* Total article limit is 30.
* Articles are sorted by popularity.
* This example uses the keyword `Banks`.

View the demo at https://duncandean.github.com/news-sentiment.
