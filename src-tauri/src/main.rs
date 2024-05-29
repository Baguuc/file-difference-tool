// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::Path};

use serde::Serialize;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
fn scan_directory(directory: String) -> Vec<String> {
    let mut readed: Vec<String> = vec![];
    let read = fs::read_dir(directory);

    if read.is_err() {
        return vec![];
    }

    let read = read.unwrap();

    read.for_each(|file| {
        if file.is_err() {
            return;
        }

        if file.is_err() {
            return;
        }

        let binding = file.unwrap().file_name();
        let filename = binding.to_str();

        if filename.is_none() {
            return;
        }

        let filename = filename.unwrap().to_string();

        readed.push(filename);
    });

    return readed;
}


#[derive(Debug, Serialize)]
struct FileDifferenceItem {
    filename: String,
    exclusive_to: Option<String>
}


#[tauri::command]
fn get_differences(directories: Vec<&str>) -> Vec<FileDifferenceItem> {
    let files1 = scan_directory(directories[0].to_string());
    let files2 = scan_directory(directories[1].to_string());

    let mut differences: Vec<FileDifferenceItem> = vec![];

    for filename in files1.clone() {
        if files2.contains(&filename) {
            if differences.iter().any(|x| x.filename == filename) {
                continue;
            }

            differences.push(FileDifferenceItem {
                filename,
                exclusive_to: None
            });
            continue;
        }
        
        differences.push(FileDifferenceItem {
            filename,
            exclusive_to: Some("f1".to_string())
        });
    }

    for filename in files2.clone() {
        if differences.iter().any(|x| x.filename == filename) {
            continue;
        }
        
        if files1.contains(&filename) {
            differences.push(FileDifferenceItem {
                filename,
                exclusive_to: None
            });
            continue;
        }
        
        differences.push(FileDifferenceItem {
            filename,
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
