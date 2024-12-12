use std::{collections::HashMap, fs, path::Path};

use serde::{Deserialize, Serialize};

fn bubblesort<T, R>(v: &mut [T], transform: fn(item: &T) -> R)
where 
    T: Clone,
    R: PartialOrd + Ord
{
    let n = v.len();
    for i in 0..(n - 1) {
        let mut swapped = false;

        for j in 0..(n - i - 1) {
            let jv = v[j].clone();
            let j1v = v[j + 1].clone();

            if transform(&jv) > transform(&j1v) {
                v[j] = j1v;
                v[j + 1] = jv;

                swapped = true;
            }
        }

        if !swapped {
            break;
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
struct FileListItem {
    filename: String,
    // "1" | "2" | "both"
    folder: String
}
type FileListData = Vec<FileListItem>;

type MergedByName = HashMap<String, FileListItem>;

#[derive(Serialize, Deserialize)]
struct File {
    name: String
}

fn merge_by_name(path1: Vec<File>, path2: Vec<File>) -> MergedByName {
    let mut merged = MergedByName::new();

    for file in path1 {
        let group_item = FileListItem {
            filename: file.name.clone(),
            folder: "1".to_string()
        };

        merged.insert(file.name.clone(), group_item);
    }

    for file in path2 {
        if let Some(entry) = merged.get_mut(&file.name) {
            entry.folder = "both".to_string();
        } else {
            let group_item = FileListItem {
                filename: file.name.clone(),
                folder: "2".to_string()
            };

            merged.insert(file.name.clone(), group_item);
        }
    }

    return merged;
}

fn sort_by_name(merged_by_name: MergedByName) -> FileListData {
    let mut as_file_list = merged_by_name.iter()
        .map(|(_, item)| {
            let item = FileListItem {
                filename: item.filename.clone(),
                folder: item.folder.clone()
            };
            
            return item;
        })
        .collect::<FileListData>();
    bubblesort::<FileListItem, String>(as_file_list.as_mut_slice(), |item| item.filename.clone());

    return as_file_list;
}

#[tauri::command]
fn scan_paths(path1: Vec<File>, path2: Vec<File>) -> FileListData {
    let merged_by_name = merge_by_name(path1, path2);
    let sorted = sort_by_name(merged_by_name);
    
    return sorted;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![scan_paths])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
