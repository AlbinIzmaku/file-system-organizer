# CLI File System Organizer

A simple Node.js CLI tool that organizes files inside a user-specified directory, useful for cleaning messy folders full of mixed files.
It automatically detects file types based on extensions and moves them into categorized folders inside your home directory:
/documents
/images
/videos
/others

## Features

- Asks the user for a directory path
- Validates that the path exists and is a directory
- Organizes files by extension:
  Documents → .pdf, .docx, .txt, .xlsx
  Images → .jpg, .png, .gif, .svg, etc.
  Videos → .mp4, .mkv, .avi, etc.
  Everything else → moved into others
- Creates destination folders automatically if they don't exist
- Runs safely and interactively

## Folder Structure Created

The script creates these folders inside your home directory:
![Screenshot](./images/folder-structure.png)
