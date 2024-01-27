/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import fetch from 'node-fetch'; // Import fetch for making HTTP requests
import fs from 'fs';
import path from 'path';

const TRANSLATIONS_DIR = './src/translations';
const SOURCE_LANG_FILE = 'en.json';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'; // Adjust if needed
const OPENAI_API_KEY = 'sk-YOURKEYHERE'; // Remember to replace with your actual key

interface LangContent {
  [key: string]: string | LangContent;
}

// Assuming you have a function to handle text wrapping with <mark> tags
// Assuming you have a function to handle text wrapping with <mark> tags
// Assuming you have a function to handle text wrapping with <mark> tags
// Assuming you have a function to handle text wrapping with <mark> tags
function wrapSelectedTextWithMark() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const markedText = `<mark>${selectedText}</mark>`;
    range.deleteContents();
    range.insertNode(document.createRange().createContextualFragment(markedText));
  } else {
    console.error("No text selected.");
  }
}

// Assuming you have a function to handle text unwrapping from <mark> tags
function unwrapSelectedTextFromMark() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const selectedNode = selection.anchorNode.parentElement;
    if (selectedNode && selectedNode.nodeName === 'MARK' && selectedNode.parentNode) {
      const selectedText = selectedNode.textContent;
      const textNode = document.createTextNode(selectedText);
      selectedNode.parentNode.replaceChild(textNode, selectedNode);
    }
  } else {
    console.error("No text selected.");
  }
}

// Add event listener to the mark button
const markButton = document.getElementById('mark-button');
if (markButton) {
  markButton.addEventListener('click', function() {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const selectedNode = selection.anchorNode.parentElement;
      if (selectedNode && selectedNode.nodeName === 'MARK' && selectedNode.parentNode) {
        unwrapSelectedTextFromMark();
      } else {
        wrapSelectedTextWithMark();
      }
    } else {
      console.error("No text selected.");
    }
  });
} else {
  console.error("Mark button not found.");
}


;


async function main() {
  const sourceLangContent = JSON.parse(
    fs.readFileSync(path.join(TRANSLATIONS_DIR, SOURCE_LANG_FILE), 'utf8')
  );

  const files = fs.readdirSync(TRANSLATIONS_DIR);

  for (const file of files) {
    if (file === SOURCE_LANG_FILE || file === 'translation-schema.json' || !file.endsWith('.json')) {
      continue;
    }

    console.log('Processing file:', file);

    const targetLangContent = JSON.parse(
      fs.readFileSync(path.join(TRANSLATIONS_DIR, file), 'utf8')
    );
    const missingKeys = findMissingKeys(sourceLangCon `tent, targetLangContent);

    let hasChanged = false;

    for (const missingKey of missingKeys) {
      const keys = missingKey.split('.');
      const sourceText = keys.reduce((acc, key) => (acc as LangContent)[key] as string, sourceLangContent);
      const targetLang = file.split('.')[0];

      const translatedText = await translateText(sourceText, targetLang);
      let targetObj = targetLangContent;

      for (let i = 0; i < keys.length - 1; i += 1) {
        if (!targetObj[keys[i]]) {
          targetObj[keys[i]] = {};
        }
        targetObj = targetObj[keys[i]] as LangContent;
      }

      targetObj[keys[keys.length - 1]] = translatedText;
      hasChanged = true;
    }

    if (hasChanged) {
      const sortedContent = sortKeys(targetLangContent);
      fs.writeFileSync(
        path.join(TRANSLATIONS_DIR, file),
        JSON.stringify(sortedContent, null, 2)
      );
    }
  }
}

main()
  .then(() => {
    console.log('Translation update completed.');
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });

async function translateText(text: string, targetLang: string): Promise<string> {
  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      max_tokens: 150,
      model: 'text-davinci-003', // Adjust the model if needed
      messages: [
        {
          role: 'system',
          content: `Only respond with the translation of the text you receive. The original language is English and the translation language is ${targetLang}. Only respond with the translation - do not say anything else. If you cannot translate the text, respond with "[SKIPPED]"`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    }),
  });

  const data = await response.json();
  console.log('  Old text:', text, 'New text:', data.choices[0].message.content.trim());
  return data.choices[0].message.content.trim();
}

function findMissingKeys(baseObj: LangContent, targetObj: LangContent, prefix = ''): string[] {
  let missingKeys: string[] = [];

  for (const key in baseObj) {
    if (typeof baseObj[key] === 'object') {
      missingKeys = missingKeys.concat(
        findMissingKeys(baseObj[key] as LangContent, targetObj[key] as LangContent || {}, `${prefix}${key}.`)
      );
    } else if (!(key in targetObj)) {
      missingKeys.push(`${prefix}${key}`);
    }
  }

  return missingKeys;
}

function sortKeys(obj: LangContent): LangContent[] {
  if (typeof obj !== 'object' || obj === null) return [obj as LangContent];

  if (Array.isArray(obj)) {
    return obj.map(item => sortKeys(item)[0]) as LangContent[];
  }

  const sortedKeys = Object.keys(obj).sort();
  const sortedObj: LangContent = {};

  for (const key of sortedKeys) {
    sortedObj[key] = sortKeys(obj[key] as LangContent)[0];
  }

  return [sortedObj];
}
