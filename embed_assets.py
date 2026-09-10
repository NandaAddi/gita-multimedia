"""
Backward-compatibility proxy for tools/pipeline/embed_assets.py
Allows running 'python embed_assets.py' directly from the root directory.
"""
import runpy
from pathlib import Path

target = Path(__file__).resolve().parent / "tools" / "pipeline" / "embed_assets.py"
runpy.run_path(str(target), run_name="__main__")
