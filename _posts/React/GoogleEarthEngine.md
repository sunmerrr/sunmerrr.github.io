---
title: "Google Earth Engine - Code Editor"
excerpt: "구글 어스 엔진 코드 에디터 사용법"

categories:
  - React
tags:
  - [react, javascript, library, function component, abstraction]

toc: true
toc_sticky: true
 
date: 2023-08-20
last_modified_at: 2023-08-26
---

## 타임 랩스를 보는 것으로 유명한 Google Earth Engine의 Code Editor 사용법을 정리해보려고 한다.

1. 왼쪽 상단     
    The upper left panel contains three tabs: Scripts, Docs, and Assets. The Scripts tab contains example scripts and scripts you save using the Save button in the code editor. The Docs tab contains documentation for the Earth Engine API functions. Toward the top of the Docs tab there's a search box that you can use to search for functions by name. The Assets tab contains the list of assets you've uploaded to Earth Engine. You can use it to upload, view, and manage your assets.
    1. Scripts
    1. Docs
    1. Assets
    1. Repo Manager    
        Manage and search repositories and API examples. Your repositories are organized by access level and prefixed by your home folder.

        You can still access your old repositories under the Archive or at Earth Engine Google Source.
    1. Documentation List    
        Get familiar with the Earth Engine API documentation in a searchable tree. Use the documentation filter to search by prefix and word. Methods colored red are deprecated; methods prefixed by the class name are static and listed first; arguments in italics are optional.
    1. Assets Manager
        Manage, upload, and share your raster and vector data. Your stored data may be organized by Cloud project or by Earth Engine asset repository.


1. 중앙 상단(편집기 패널)    
    The upper center panel is the text editor. Write and edit code here and click the Run button to execute your script. Script saving and sharing are also available here. Imports appear at the top of the editor. Create dataset imports by clicking on import buttons. Create geometry imports by using the Geometry Editor tools.
    1. Get Link Button    
        Get a publicly available unique link to a snapshot of the script. The URL will appear in your address bar.

    1. Save Button: Save your script with a unique name and access it later from the Scripts Manager. Your script will remain private.

    1. Run Button
    1. Reset Button
    1. Manage Apps Button
    1. Settings Button: Modify your Editor's settings; these include code autocomplete and underlined suggestions.

1. 오른쪽 상단    
    The upper right panel contains the Inspector, Console, and Tasks tabs. Use the Inspector to examine coordinates, pixel values, and layer information from any point on the map. The Console holds output from print() calls, charts, and errors. Long-running tasks are managed in the Tasks tab.
    1. Inspector    
        Get coordinates, pixel values, and layer information at any location on the map. Interactively plot band values or time series by toggling the chart icon for Images or ImageCollections added to the Map.

    1. Console
    1. Tasks    
        Launch, track, and cancel tasks. A task is a long-running background process that is created with the Export function in a script. The tasks will continue to run even if the browser is closed.

1. UI Root     
    At the bottom is the map where your imagery analysis results are displayed.

    The pulldown in the upper right corner of the map lets you manage your image layers' visualization properties.

    The upper left provides a geometries editor you can use to draw points, lines, and polygons.

    You can manipulate the map with the Map object, and with the User Interface API under the ui.* namespace you can further customize this portion of the screen.