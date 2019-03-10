// Adapted from the original at https://github.com/tensorflow/tfjs-examples/blob/master/sentiment/loader.js

import * as tf from '@tensorflow/tfjs';

/**
 * Load pretrained model stored at a remote URL.
 *
 * @return An instance of `tf.Model` with model topology and weights loaded.
 */
export async function loadHostedPretrainedModel(url: string) {
  try {
    const model = await tf.loadLayersModel(url);
    return model;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Load metadata file stored at a remote URL.
 *
 * @return An object containing metadata as key-value pairs.
 */
export async function loadHostedMetadata(url: string) {
  try {
    const metadataJson = await fetch(url);
    const metadata = await metadataJson.json();
    return metadata;
  } catch (err) {
    console.error(err);
  }
}
