// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
fn scan_directory(directory: String) -> Vec<String> {
    let mut read: Vec<String> = vec![];
    fs::read_dir(directory).unwrap().for_each(|file| {
        if file.is_err() {
            return;
        }
        
        let binding = file.unwrap().file_name();
        let filename = binding.to_str();

        if filename.is_none() {
            return;
        }

        let binding = filename.unwrap().to_string();
        let mut filename = binding.split(".").collect::<Vec<&str>>();
        filename.pop();
        let filename = filename.join(".");

        read.push(filename);
    });

    return read;
}


#[tauri::command]
fn get_differences(directories: Vec<&str>) -> Vec<Vec<String>> {
    let files1 = scan_directory(directories[0].to_string());
    let files2 = scan_directory(directories[1].to_string());

    let mut f1_diff: Vec<String> = vec![];
    let mut f2_diff: Vec<String> = vec![];

    for filename in files1.clone() {
        if files2.contains(&filename) {
            continue;
        }
        
        f1_diff.push(filename);
    }

    for filename in files2.clone() {
        if files1.contains(&filename) {
            continue;
        }
        
        f2_diff.push(filename);
    }
    
    return vec![f1_diff, f2_diff];
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_differences])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
