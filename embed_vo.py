"""
Backward-compatibility proxy for tools/pipeline/embed_vo.py
Allows running 'python embed_vo.py' directly from the root directory.
"""
import runpy
from pathlib import Path

target = Path(__file__).resolve().parent / "tools" / "pipeline" / "embed_vo.py"
runpy.run_path(str(target), run_name="__main__")
