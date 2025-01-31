import React from 'react'
import { Modal } from 'antd';

export const CorrectionModal = ({ data }) => {
  return (
    <Modal
      title="Корекція показань"
      centered
      open={data.flag}
      onOk={() => data.onConfirm()}
      onCancel={() => data.onCancel()}
    >
      <p>Ви ввели нижчі показники за попередні, ви впевнені в показниках?</p>
      <p>День:</p>
      <p>Минулі: {data.prevDay} Поточні: {data.newDay}</p>
      <p>Ніч:</p>
      <p>Минулі: {data.prevNight} Поточні: {data.newNight}</p>
    </Modal>
  );
};