// Adapted from the original at https://github.com/tensorflow/tfjs-examples/blob/master/sentiment/index.js

import * as tf from '@tensorflow/tfjs';
import * as loader from './loader';
import { OOV_INDEX, padSequences } from './sequence-utils';

interface Urls {
  metadata: string;
  model: string;
}

const HOSTED_URLS = {
  model:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
  metadata:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
};

export class SentimentPredictor {
  indexFrom: number;
  urls: Urls;
  model: tf.LayersModel;
  maxLen: number;
  wordIndex: number;
  vocabularySize: number;

  async init(urls: Urls) {
    this.urls = urls;
    this.model = await loader.loadHostedPretrainedModel(urls.model);
    await this.loadMetadata();
    return this;
  }

  async loadMetadata() {
    const sentimentMetadata =
        await loader.loadHostedMetadata(this.urls.metadata);
    /* tslint:disable: no-string-literal */
    this.indexFrom = sentimentMetadata['index_from'];
    this.maxLen = sentimentMetadata['max_len'];
    this.wordIndex = sentimentMetadata['word_index'];
    this.vocabularySize = sentimentMetadata['vocabulary_size'];
  }

  predict(text: string): number {
    // Convert to lower case and remove all punctuations.
    const inputText =
        text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    // Convert the words to a sequence of word indices.
    const sequence = inputText.map((word) => {
      let wordIndex = this.wordIndex[word] + this.indexFrom;
      if (wordIndex > this.vocabularySize) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], this.maxLen);
    const input = tf.tensor2d(paddedSequence, [1, this.maxLen]);
    const predictOut = this.model.predict(input) as tf.Tensor<tf.Rank>;
    const score: number = predictOut.dataSync()[0];
    predictOut.dispose();
    return score;
  }
}

/**
 * Loads the pretrained model and metadata, and registers the predict
 * function with the UI.
 */
export async function setupSentimentPredictor(): Promise<SentimentPredictor> {
  return new SentimentPredictor().init(HOSTED_URLS);
}

setupSentimentPredictor();
