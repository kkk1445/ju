import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #2563eb;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
  
  &.error {
    border-color: #ef4444;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ApplicationForm = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Firebase에 데이터 저장
      await addDoc(collection(db, 'applications'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      
      toast.success('신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.');
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <FormOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <FormContainer
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>✕</CloseButton>
            
            <FormTitle>태아보험 신청</FormTitle>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>신청자 성명 *</Label>
                <Input
                  {...register('applicantName', { required: '성명을 입력해주세요' })}
                  placeholder="신청자 성명"
                  className={errors.applicantName ? 'error' : ''}
                />
                {errors.applicantName && (
                  <ErrorMessage>{errors.applicantName.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>연락처 *</Label>
                <Input
                  {...register('phone', { 
                    required: '연락처를 입력해주세요',
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: '올바른 연락처 형식을 입력해주세요'
                    }
                  })}
                  placeholder="010-1234-5678"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && (
                  <ErrorMessage>{errors.phone.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>이메일</Label>
                <Input
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '올바른 이메일 형식을 입력해주세요'
                    }
                  })}
                  placeholder="example@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>예정일 *</Label>
                <Input
                  type="date"
                  {...register('dueDate', { required: '예정일을 선택해주세요' })}
                  className={errors.dueDate ? 'error' : ''}
                />
                {errors.dueDate && (
                  <ErrorMessage>{errors.dueDate.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>보험료 예산</Label>
                <Select {...register('budget')}>
                  <option value="">선택해주세요</option>
                  <option value="under-50k">월 5만원 미만</option>
                  <option value="50k-100k">월 5-10만원</option>
                  <option value="100k-200k">월 10-20만원</option>
                  <option value="over-200k">월 20만원 이상</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>추가 문의사항</Label>
                <TextArea
                  {...register('additionalInfo')}
                  placeholder="추가로 궁금한 점이나 특별한 요구사항이 있으시면 적어주세요"
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner /> 신청 중...
                  </>
                ) : (
                  '신청하기'
                )}
              </SubmitButton>
            </Form>
          </FormContainer>
        </FormOverlay>
      )}
    </AnimatePresence>
  );
};

export default ApplicationForm;
