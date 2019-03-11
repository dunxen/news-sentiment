// Adapted from the original at https://github.com/tensorflow/tfjs-examples/blob/master/sentiment/sequence_utils.js

/**
 * Utilities for sequential data.
 */
/* tslint:disable: no-parameter-reassignment */

export const PAD_INDEX = 0;  // Index of the padding character.
export const OOV_INDEX = 2;  // Index fo the OOV character.

/**
 * Pad and truncate all sequences to the same length
 *
 * @param sequences The sequences represented as an array of array
 *   of numbers.
 * @param maxLen Maximum length. Sequences longer than `maxLen` will be
 *   truncated. Sequences shorter than `maxLen` will be padded.
 * @param padding Padding type.
 * @param truncating Truncation type.
 * @param value Padding value.
 */
export function padSequences(
    sequences: number[][],
    maxLen: number,
    padding = 'pre',
    truncating = 'pre',
    value = PAD_INDEX
  ) {
  // TODO(cais): This perhaps should be refined and moved into tfjs-preproc.
  return sequences.map((seq) => {
    // Perform truncation.
    if (seq.length > maxLen) {
      if (truncating === 'pre') {
        seq.splice(0, seq.length - maxLen);
      } else {
        seq.splice(maxLen, seq.length - maxLen);
      }
    }

    // Perform padding.
    if (seq.length < maxLen) {
      const pad = [];
      // tslint:disable-next-line: no-increment-decrement
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value);
      }
      if (padding === 'pre') {
        seq = pad.concat(seq);
      } else {
        seq = seq.concat(pad);
      }
    }

    return seq;
  });
}
