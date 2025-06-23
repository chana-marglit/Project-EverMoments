import type React from "react"
import { useState } from "react"
import { Button, Input, Tag } from "antd"
import { PlusOutlined } from "@ant-design/icons"

interface TagsEditorProps {
  tags: string
  onSave: (tags: string) => void
  onCancel: () => void
}

const TagsEditor: React.FC<TagsEditorProps> = ({ tags, onSave, onCancel }) => {
  const [currentTags, setCurrentTags] = useState(tags)
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const tagList = currentTags
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim())

  const handleTagInputConfirm = () => {
    if (inputValue && !tagList.includes(inputValue.trim())) {
      const newTags = [...tagList, inputValue.trim()].join(",")
      setCurrentTags(newTags)
    }
    setInputVisible(false)
    setInputValue("")
  }

  const handleTagClose = (removedTag: string) => {
    const newTags = tagList.filter((tag) => tag !== removedTag).join(",")
    setCurrentTags(newTags)
  }

  const handleSave = () => {
    onSave(currentTags)
  }

  return (
    <div className="tags-editor">
      <div className="tags-container">
        {tagList.map((tag, index) => (
          <Tag key={index} closable onClose={() => handleTagClose(tag)} style={{ margin: "3px" }}>
            {tag}
          </Tag>
        ))}

        {inputVisible ? (
          <Input
            type="text"
            size="small"
            style={{ width: 100 }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleTagInputConfirm}
            onPressEnter={handleTagInputConfirm}
            autoFocus
            placeholder="תגית חדשה"
          />
        ) : (
          <Tag onClick={() => setInputVisible(true)} style={{ borderStyle: "dashed", cursor: "pointer" }}>
            <PlusOutlined /> הוסף תגית
          </Tag>
        )}
      </div>

      <div className="tags-actions">
        <Button type="primary" size="small" onClick={handleSave}>
          שמור
        </Button>
        <Button size="small" onClick={onCancel}>
          ביטול
        </Button>
      </div>
    </div>
  )
}

export default TagsEditor
