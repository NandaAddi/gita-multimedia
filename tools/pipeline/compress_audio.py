"""
tools/pipeline/compress_audio.py
Automated Audio Compression Pipeline (WAV -> MP3 48kbps Mono via imageio-ffmpeg)
Memangkas voice-over dari 15.7 MB Base64 menjadi ~1.8 MB Base64.
"""

import os
import sys
import subprocess
from pathlib import Path

# Safe terminal encoding on Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

try:
    import imageio_ffmpeg
    FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
except Exception as e:
    print(f"Error locating ffmpeg via imageio_ffmpeg: {e}")
    sys.exit(1)

REPO_ROOT = Path(__file__).resolve().parents[2]
VO_DIR = REPO_ROOT / "WEBSITE" / "assets" / "voice-over"
MP3_DIR = REPO_ROOT / "WEBSITE" / "assets" / "voice-over-mp3"

def compress_voice_over():
    print("=" * 65)
    print(" ECO-EXPLORER: VOICE-OVER AUDIO COMPRESSION (48kbps Mono MP3)")
    print("=" * 65)

    MP3_DIR.mkdir(parents=True, exist_ok=True)
    wav_files = sorted(VO_DIR.glob("*.wav"))

    if not wav_files:
        print(f"No WAV files found in {VO_DIR}!")
        return

    total_orig = 0
    total_new = 0

    for idx, wav_path in enumerate(wav_files, 1):
        mp3_path = MP3_DIR / f"{wav_path.stem}.mp3"
        
        cmd = [
            FFMPEG_EXE, "-y",
            "-i", str(wav_path),
            "-ac", "1",           # Mono
            "-ar", "24000",       # 24kHz
            "-b:a", "48k",        # 48 kbps
            str(mp3_path)
        ]
        
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        sz_orig = wav_path.stat().st_size
        sz_new = mp3_path.stat().st_size
        total_orig += sz_orig
        total_new += sz_new
        reduction = (1 - sz_new / sz_orig) * 100
        print(f"[{idx:2}/25] {wav_path.name:25} : {sz_orig/1024:6.1f} KB -> {sz_new/1024:5.1f} KB (-{reduction:.1f}%)")

    total_reduction = (1 - total_new / total_orig) * 100
    print("\n" + "=" * 65)
    print(f"TOTAL AUDIO: {total_orig/(1024*1024):.2f} MB -> {total_new/(1024*1024):.2f} MB (-{total_reduction:.1f}%)")
    print("=" * 65)

if __name__ == "__main__":
    compress_voice_over()
