"use client"

import type React from "react"
import { Modal, Select, message } from "antd"
import { ShareAltOutlined } from "@ant-design/icons"
import type { User } from "../types" // ✅ ייבוא מהקובץ המרכזי

interface ShareModalProps {
  isOpen: boolean
  imageId: number | null
  userList: User[]
  selectedUserIds: number[]
  onClose: () => void
  onShare: (imageId: number, userIds: number[]) => Promise<void>
  onUserSelectionChange: (userIds: number[]) => void
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  imageId,
  userList,
  selectedUserIds,
  onClose,
  onShare,
  onUserSelectionChange,
}) => {
  const handleShare = async () => {
    if (!imageId || selectedUserIds.length === 0) {
      message.warning("נא לבחור לפחות משתמש אחד לשיתוף")
      return
    }

    try {
      await onShare(imageId, selectedUserIds)
      message.success(`התמונה שותפה עם ${selectedUserIds.length} משתמשים`)
      onClose()
    } catch (error) {
      console.error("שגיאה בשיתוף תמונה:", error)
      message.error("שגיאה בשיתוף התמונה. נסה שוב מאוחר יותר.")
    }
  }

  const userOptions = userList.map((user) => ({
    label: (
      <div className="user-option">
        <span className="user-name">{user.fullName}</span>
        {user.email && <span className="user-email">{user.email}</span>}
      </div>
    ),
    value: user.id,
    key: user.id,
  }))

  return (
    <Modal
      title={
        <div className="share-modal-title">
          <ShareAltOutlined style={{ marginLeft: 8 }} />
          שתף תמונה עם משתמשים
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      onOk={handleShare}
      okText="שתף"
      cancelText="ביטול"
      width={500}
      className="share-modal"
    >
      <div className="share-modal-content">
        <p className="share-description">בחר את המשתמשים שברצונך לשתף איתם את התמונה:</p>

        <Select
          mode="multiple"
          placeholder="חפש ובחר משתמשים..."
          style={{ width: "100%" }}
          value={selectedUserIds}
          onChange={onUserSelectionChange}
          options={userOptions}
          showSearch
          filterOption={(input, option) =>
            option?.label?.props?.children?.[0]?.props?.children?.toLowerCase()?.includes(input.toLowerCase()) || false
          }
          maxTagCount="responsive"
          size="large"
        />

        {selectedUserIds.length > 0 && (
          <div className="selected-users-info">נבחרו {selectedUserIds.length} משתמשים לשיתוף</div>
        )}
      </div>
    </Modal>
  )
}

export default ShareModal
