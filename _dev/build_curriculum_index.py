#!/usr/bin/env python3
"""
Regenerate curriculum_by_course.json and curriculum_data.js from the 225 source JSON files.
Maps competencies (not individual I Can statements) as the assessable standards.
"""
import json
import os
import glob

SOURCE_DIR = os.path.join(os.path.dirname(__file__), "BC Curriculum Documents")
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), "curriculum_by_course.json")
OUTPUT_JS = os.path.join(os.path.dirname(__file__), "curriculum_data.js")

def build_index():
    files = sorted(glob.glob(os.path.join(SOURCE_DIR, "**", "*.json"), recursive=True))
    index = {}
    total_comps = 0
    total_icans = 0

    for fpath in files:
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)

        meta = data.get("metadata", {})
        short_tag = meta.get("short_tag")
        if not short_tag:
            print(f"  SKIP (no short_tag): {fpath}")
            continue

        cc = data.get("curricular_competencies", {})
        categories = []

        for cat in cc.get("categories", []):
            competencies = []
            for comp in cat.get("competencies", []):
                # Normalize i_can_statements to plain strings
                raw_icans = comp.get("i_can_statements", [])
                icans = []
                for s in raw_icans:
                    if isinstance(s, dict):
                        icans.append(s.get("statement", str(s)))
                    else:
                        icans.append(str(s))

                competencies.append({
                    "id": comp.get("id", ""),
                    "short_label": comp.get("short_label", ""),
                    "tag": comp.get("tag", ""),
                    "raw": comp.get("raw", ""),
                    "i_can_statements": icans
                })
                total_comps += 1
                total_icans += len(icans)

            categories.append({
                "name": cat.get("name", ""),
                "competencies": competencies
            })

        index[short_tag] = {
            "course_name": meta.get("course_name", ""),
            "grade": meta.get("grade"),
            "subject": meta.get("subject", ""),
            "categories": categories
        }

    return index, total_comps, total_icans

def main():
    print("Building curriculum index from source JSON files...")
    index, total_comps, total_icans = build_index()

    print(f"  Courses: {len(index)}")
    print(f"  Competencies: {total_comps}")
    print(f"  I Can Statements: {total_icans}")

    # Write JSON index
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=None, separators=(",", ":"))
    size_kb = os.path.getsize(OUTPUT_JSON) / 1024
    print(f"  Written: {OUTPUT_JSON} ({size_kb:.0f} KB)")

    # Write JS fallback for file:// protocol
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write("window._CURRICULUM_DATA = ")
        json.dump(index, f, ensure_ascii=False, indent=None, separators=(",", ":"))
        f.write(";\n")
    size_kb = os.path.getsize(OUTPUT_JS) / 1024
    print(f"  Written: {OUTPUT_JS} ({size_kb:.0f} KB)")

    print("Done.")

if __name__ == "__main__":
    main()
