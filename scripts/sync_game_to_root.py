#!/usr/bin/env python3
"""
Sync game files from 'TES GITA BARU 1' directory to the repository root.
This allows the game to be hosted directly on the root domain (https://skripsi.agitakhairunnisa.my.id/)
without any redirect or subpath, while preserving backward compatibility.
"""

import os
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = REPO_ROOT / "TES GITA BARU 1"

SYNC_FILES = [
    "index.html",
    "manifest.json",
    "sw.js",
]

SYNC_DIRS = [
    "css",
    "js",
    "assets",
    "fonts",
    "icons",
    "backsound",
    "voice-over",
    "gita-thinking",
    "talking_loop",
    "worried_loop",
]

def sync_game():
    print(f"[*] Starting game sync: {SOURCE_DIR.name} -> ROOT")
    if not SOURCE_DIR.exists():
        print(f"[!] Error: Source directory '{SOURCE_DIR}' not found!")
        sys.exit(1)

    # 1. Sync individual files
    for fname in SYNC_FILES:
        src = SOURCE_DIR / fname
        dst = REPO_ROOT / fname
        if src.exists():
            shutil.copy2(src, dst)
            print(f"  [+] Synced file: {fname}")
        else:
            print(f"  [!] Missing file: {src}")

    # 2. Sync directories
    for dname in SYNC_DIRS:
        src = SOURCE_DIR / dname
        dst = REPO_ROOT / dname
        if src.exists():
            # Use dirs_exist_ok=True to update existing folders
            shutil.copytree(src, dst, dirs_exist_ok=True)
            print(f"  [+] Synced folder: {dname}/")
        else:
            print(f"  [!] Missing folder: {src}")

    print("[SUCCESS] Game files successfully synced to repository root.")

if __name__ == "__main__":
    sync_game()
