import React, { useState } from "react";
import {
    EditorState,
    RichUtils,
    AtomicBlockUtils,
    convertToRaw,
    convertFromRaw,
    Modifier
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Editor from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createFocusPlugin from "@draft-js-plugins/focus";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import AddPictureModal from "./pictureModal";
import "@draft-js-plugins/image/lib/plugin.css";
import "draft-js/dist/Draft.css";
import "../TextEditor.css"; // Import custom CSS
import {
    Box,
    Toolbar,
    IconButton,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ImageIcon from "@mui/icons-material/Image";

// Initialize Plugins
const resizeablePlugin = createResizeablePlugin();
const focusPlugin = createFocusPlugin();
const dndPlugin = createBlockDndPlugin();
const imagePlugin = createImagePlugin({
    decorator: resizeablePlugin.decorator
});

const plugins = [dndPlugin, focusPlugin, resizeablePlugin, imagePlugin];

const TextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [headingLevel, setHeadingLevel] = useState("");
    const [fontSize, setFontSize] = useState("");
    const [pictures, setPictures] = useState([]);
    const [open, setOpen] = useState(false);

    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);

    const handleOpenPictureModal = () => {
        setOpen(true);
    };

    const handleGetPictureURL = async (pictures) => {

        setPictures(pictures);
        console.log(pictures);
    };

    // Toggle inline styles (Bold, Italic, Underline)
    const toggleInlineStyle = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    // Toggle block styles (Headings, Lists, Alignment)
    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    // Handle heading selection from dropdown
    const handleHeadingChange = (level) => {
        toggleBlockType(level);
        setHeadingLevel(level);
    };

    // Handle font size change
    const handleFontSizeChange = (size) => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const newContentState = Modifier.applyInlineStyle(
            contentState,
            selection,
            `FONTSIZE-${size}`
        );
        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            "change-inline-style"
        );
        setFontSize(size);
        setEditorState(newEditorState);
    };

    // Handle Image Upload (Button)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    "IMAGE",
                    "MUTABLE",
                    { src: e.target.result }
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = AtomicBlockUtils.insertAtomicBlock(
                    editorState,
                    entityKey,
                    " "
                );
                setEditorState(newEditorState);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Dropped Files (Drag and Drop)
    const handleDroppedFiles = (files) => {
        const file = files[0]; // Grab the first file
        const reader = new FileReader();
        reader.onload = (e) => {
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity("IMAGE", "MUTABLE", { src: e.target.result });
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");
            setEditorState(newEditorState);
        };
        reader.readAsDataURL(file);
    };

    // Attach the dropped files handler to the drag-and-drop plugin
    dndPlugin.handleDroppedFiles = handleDroppedFiles;

    return (
        <Box>
            {/* Toolbar */}
            <Toolbar sx={{ borderBottom: "1px solid #ddd", mb: 2 }}>
                <IconButton onClick={() => toggleInlineStyle("BOLD")}>
                    <FormatBoldIcon />
                </IconButton>
                <IconButton onClick={() => toggleInlineStyle("ITALIC")}>
                    <FormatItalicIcon />
                </IconButton>
                <IconButton onClick={() => toggleInlineStyle("UNDERLINE")}>
                    <FormatUnderlinedIcon />
                </IconButton>
                <IconButton onClick={() => toggleBlockType("unordered-list-item")}>
                    <FormatListBulletedIcon />
                </IconButton>
                <IconButton onClick={() => toggleBlockType("ordered-list-item")}>
                    <FormatListNumberedIcon />
                </IconButton>

                {/* Dropdown for Headings */}
                <FormControl sx={{ ml: 2, minWidth: 120 }} size="small">
                    <InputLabel>Heading</InputLabel>
                    <Select
                        value={headingLevel}
                        onChange={(e) => handleHeadingChange(e.target.value)}
                        label="Heading"
                    >
                        <MenuItem value="header-one">H1</MenuItem>
                        <MenuItem value="header-two">H2</MenuItem>
                        <MenuItem value="header-three">H3</MenuItem>
                        <MenuItem value="header-four">H4</MenuItem>
                        <MenuItem value="header-five">H5</MenuItem>
                    </Select>
                </FormControl>

                {/* Dropdown for Font Sizes */}
                <FormControl sx={{ ml: 2, minWidth: 120 }} size="small">
                    <InputLabel>Font Size</InputLabel>
                    <Select
                        value={fontSize}
                        onChange={(e) => handleFontSizeChange(e.target.value)}
                        label="Font Size"
                    >
                        <MenuItem value="12px">12px</MenuItem>
                        <MenuItem value="14px">14px</MenuItem>
                        <MenuItem value="16px">16px</MenuItem>
                        <MenuItem value="18px">18px</MenuItem>
                        <MenuItem value="24px">24px</MenuItem>
                    </Select>
                </FormControl>


                <Button
                    color='secondary'
                    variant="outlined"
                    component="label"
                    sx={{ ml: 2 }}
                    startIcon={<ImageIcon />}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Upload Image

                </Button>
            </Toolbar>

            {/* Editor */}

            <Box
                sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    minHeight: "200px",
                    borderRadius: "4px",
                }}
            >
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    plugins={plugins}
                />
            </Box>

            {/* Rendered HTML Content */}
            <Box sx={{ mt: 3, border: "1px solid #ddd", padding: 2, borderRadius: "4px" }}>
                <h3>Rendered Content:</h3>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </Box>

            {/* Debug: Output Raw Content */}
            <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "10px" }}>
                {JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}
            </pre>
            {open && (
                <AddPictureModal
                    open={open}
                    setOpen={setOpen}
                    sendData={handleGetPictureURL}
                />
            )}
        </Box>
    );
};

export default TextEditor;
