// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{collections::HashSet, path::Path};

use serde::Serialize;

#[derive(Debug, Serialize)]
struct FileDifferenceItem {
    filename: String,
    exclusive_to: Option<String>
}


#[tauri::command]
fn get_differences(files: Vec<Vec<String>>) -> Vec<FileDifferenceItem> {
    let empty_vec = vec![];

    let files1 = files.get(0).unwrap_or(&empty_vec);
    let files2 = files.get(1).unwrap_or(&empty_vec);

    let mut differences: Vec<FileDifferenceItem> = vec![];

    for filename in files1.clone() {
        if files2.contains(&filename) {
            if differences.iter().any(|x| x.filename == filename) {
                continue;
            }

            differences.push(FileDifferenceItem {
                filename: filename.to_string(),
                exclusive_to: None
            });
            continue;
        }
        
        differences.push(FileDifferenceItem {
            filename: filename.to_string(),
            exclusive_to: Some("f1".to_string())
        });
    }

    for filename in files2.clone() {
        if files1.contains(&filename) {
            if differences.iter().any(|x| x.filename == filename) {
                continue;
            }

            differences.push(FileDifferenceItem {
                filename: filename.to_string(),
                exclusive_to: None
            });
            continue;
        }
        
        differences.push(FileDifferenceItem {
            filename: filename.to_string(),
            exclusive_to: Some("f2".to_string())
        });
    }
    
    return differences;
}


#[tauri::command]
fn dir_exists(directory: String) -> bool {
    Path::new(directory.as_str()).exists()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_differences, dir_exists])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
