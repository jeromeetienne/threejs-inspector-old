## Next steps
- onSelect ui, set $_ so no action is needed to share in console
  - normal workflow in chrome devtools. Find a reference
- fix css to inline the popup menu and help buttons
  - see how the scale lock is done, do the the same
- support for texture in shader material uniforms
  - good example http://127.0.0.1:8000/examples/webgl_materials_bumpmap_skin.html
  - currently the texture is read in the inspector
  - the inspector can not yet write in the texture
  - it is due to the localisation of the texture variable in the inspected page
  - this implies to put a string in the panel texture, the string is related to an Object3D
  - like '.material.map' or 'material.uniforms.diffuse'
  - it is evaluated with eval()
  - STATUS started in panel-ui-texture.js
  

- FOCUS ON SCENE GRABBING
  - normal scene graph
  - large program without the usual render not at the same place
  - if i intercept renderer.render(scene, camera)
  - i got everything
  - iframe ? 
- issue when dropping large Texture
  - limitation of url length ?
- issue when dropping new texture without power of two
  - three.js complains about filtering
  - auto detect this case and change the filtering when setting



---
- LATER support camera hook
  - in render i put my own camera
- DONE put 'show three.js help' in context menu
- DONE support normalMap and normalScale
- DONE support material.bumpScale
- DONE support for pointCloudmaterial material.size/material.sizeAttenuation
  - http://threejs.org/docs/#Reference/Materials/PointCloudMaterial
- DONE stop requestAnimationFrame
  - regulate its rate 
  - https://gist.github.com/remy/36f388d72c1ef161582f
- DONE add a "tilt" button
  - do the 2 workarounds
  - add title='Press this button if your scene is not properly loaded.'
- DONE in contentscripts/* load it by files, not by functions
  - cleanup. no polution of namespace
- DONE put src/js/panels-ui/treeview into src/js/libs/
- INVALID put the add/remove of threeviewitem into the proper place... not in .onMessage
- DONE hide actions when no object3d is selected
  - change the title to 'add child geometry'
  - 'add child light'
  - delete/clone
- DONE look at the loading issue
  - some pages dont load all everytime
  - boilerplate.html rarely load
  - related to 'load' event. if there is a texture loaded, it load
  - otherwise it doesnt
  - https://developer.chrome.com/extensions/devtools
- DONE clean up inject code
  - split it in multiple files
- DONE this code helps too ```Inspect3js.injectInThreejs()```
  - when it is past the reload splash but wihtout scene
  - e.g. http://127.0.0.1:8000/examples/webgl_geometry_minecraft.html
- DONE contentscript-select to extract object3dtojson function and put it in its own file
- DONE put all contentscript files in their own directories
- DONE do a context popup menu in scene-brower
  - reinject - do a ```Inspect3js.injectInThreejs()```
  - collapse all - 
  - uncollapse all - 
- DONE split the contentscript-main.js into smaller one
  - try again you understand it better now
- DONE this code pasted in console. unblock the 'reload-to-death
```
	window.postMessage({
		source: 'ThreejsEditor', 
		method: 'init'
	}, '*');
```        
- DONE when creating a texture, the material.needsUpdate = true
- LATER implement more geometry
- DONE use same namespace for all devtools spacec 
  - var InspectDevTools	= InspectDevTools	|| {}
- DONE pass treeView in normal three.js panel implementation
  - up to panel-ui-sceneview.js
- DONE do a "About" tab in left sidebar
- DONE improve texture
  - WONTDO put a context menu
    - export to console $texture
    - inline help
  - LATER visualisation of the texture in devtool
  - set a new texture from an url
  - same UI as three.js/editor for now
  - reuse the code 
  - only pass the texture.sourceFile to devtools
  - read by url. not canvas
  - LATER handle dragdrop ?
- DONE material-shader is broken
  - it doesnt handle the faceMaterialIndex
  - port it to faceMaterialIndex
- DONE complete uniform color
- DONE texture image import from inspector
  - issue with CORS
- DONE implement facematerial
  - panel-ui-facematerial.js
    - visible only if object.material is facematerial
  - at the same level of the panel-ui-material
  - it will spawn panel-ui-material
- DONE click on texture header = toggleCollapse
- WONTDO enable disable texture ?
- DONE handle material.blending
  - DONE depthWrite/depthTest
  - DONE .visible
  - DONE .alphaTest
- DONE handle texture.anisotropy
  - http://127.0.0.1:8000/examples/webgl_materials_texture_anisotropy.html
- DONE rewrite the facematerial panel-ui handling with a 'faceMaterialIndex'
  - ```var material = faceMaterialIndex === -1 ? object3d.material : object3d.material.materials[faceMaterialIndex]```
- DONE implement buffer geometry
  - planebuffer
  - issue in minecraft-ao
- DONE implement pointcloud
- DONE particles crash the inspector 
  - http://threejs.org/examples/webgl_sprites.html
- DONE handle texture
  - how ? which one ? 
  - do i get back the space3 one ?
  - no reimplement it as a panel, no special css for now
  - normal panel collapsible, repeat/offset/wrapX, wrapV
  - make it collapsable
  - to send back UI changes to the content pages
    - notify textureRow.onChange()
    - textureRow.getValue() returns the json object
    - inject the json object in the content page
    - from this json, update the THREE.Texture in the content page
- DONE populate the extension publication with good blabla and good picture
  - ask alejendra
- DONE Do links to docs
  - good to learn
  - http://threejs.org/docs/#Reference/Objects/Mesh
- DONE handle material.wireframeLineWidth
- DONE handle material.shading 
- DONE pass object3d.groundColor for hemisphere
- DONE implement the number slider accelerator with the same meta key as devtools itself
- DONE add 'export json' to the object3d special menu
- DONE what about a tab on the left side
- DONE export selected object in console as '$object3d'
- DONE do automatic periodical updateUI
  - aka automatically send the last object sent
  - it might be good to put that into an option
- DONE find a namespace for the codeinjected in the page
  - injectedThreejsInspector.*
- DONE mvp = my scene browser. to be published monday
  - collaboration with @thespite would be great
  - avoid code duplication
- DONE remove the debug with special log, this is useless
- DONE move his scene browser until it match the feature of your own
- DONE rename treeView 
- DONE mvp = my scene browser. to be published monday
- DONE how to handle all the optional property
  - fill the property in the three2ext object3d json object
  - only if it exist
  - then use this canonic format to display or not the various field
  - this should allow to handle the camera fox/far/near
  - allow to handle light color/intensity
- DONE select material - change material in the panel-ui-material.js
- DONE put signals in devtools.
  - thus people can listen on signal like it is done on editor
- DONE automatically select the first object on load
- DONE automatically inject the scene
- DONE rename panel2 into panel
- DONE rename src2 into src 
  - and src into src-original
- DONE refactor the folders
  - DONE images in images/
  - all devtools stuff in its corner
  - all UI editor in its corner
- DONE make debug easier
  - when you load panel.html as a normal webpage, try to behave
  - use the normal mechanism to debug chrome extension 