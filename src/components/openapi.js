import OpenAI from 'openai';
import { openai_key } from '../constants';

export const openai = new OpenAI({
  apiKey: openai_key,
  dangerouslyAllowBrowser: true // This is the default and can be omitted
});

