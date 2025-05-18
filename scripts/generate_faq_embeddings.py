"""
This script generates vector embeddings for each FAQ entry in company-faq.json
using HuggingFace's sentence-transformers (all-MiniLM-L6-v2 by default).

How to use (beginner-friendly):
1. Install Python 3.8+ (if not installed)
2. Install requirements: pip install -r requirements.txt
3. Place your FAQ data in lib/data/company-faq.json (list of {question, answer})
4. Run: python scripts/generate_faq_embeddings.py
   - This will create lib/data/company-faq-embeddings.json (used by the fallback AI)
5. If you update your FAQ, rerun this script to regenerate embeddings.

Advanced: You can also generate an embedding for a single query (for Node.js fallback):
   python scripts/generate_faq_embeddings.py --query "your question here"
   - This will print the embedding as a JSON array to stdout.
"""

import json
import os
import sys
from pathlib import Path
from sentence_transformers import SentenceTransformer

# Configuration
FAQ_PATH = Path(__file__).parent.parent / 'lib' / 'data' / 'company-faq.json'
EMBEDDINGS_PATH = Path(__file__).parent.parent / 'lib' / 'data' / 'company-faq-embeddings.json'
MODEL_NAME = 'sentence-transformers/all-MiniLM-L6-v2'

# Load embedding model
print(f"Loading model: {MODEL_NAME}")
model = SentenceTransformer(MODEL_NAME)

# Support single-query embedding for Node.js fallback
if '--query' in sys.argv:
    idx = sys.argv.index('--query')
    if idx + 1 < len(sys.argv):
        query = sys.argv[idx + 1]
        emb = model.encode([query], convert_to_numpy=True)[0]
        print(json.dumps(emb.tolist()))
        sys.exit(0)
    else:
        print("Error: --query flag provided without a query string.", file=sys.stderr)
        sys.exit(1)

# Default: generate embeddings for all FAQ entries
# Load FAQ data
with open(FAQ_PATH, 'r', encoding='utf-8') as f:
    faqs = json.load(f)

# Compute embeddings for each question
questions = [entry['question'] for entry in faqs]
print(f"Generating embeddings for {len(questions)} questions...")
embeddings = model.encode(questions, show_progress_bar=True, convert_to_numpy=True)

# Save embeddings alongside original data
output = [
    {
        'question': entry['question'],
        'answer': entry['answer'],
        'embedding': emb.tolist()
    }
    for entry, emb in zip(faqs, embeddings)
]

with open(EMBEDDINGS_PATH, 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2)

print(f"Embeddings saved to {EMBEDDINGS_PATH}")
