import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #ff8ee0;
`;

const Card = styled(motion.div)`
  width: 100%;
  max-width: 740px;
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #2b2240;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 1rem;
  &:focus { outline: none; border-color: #a855f7; }
  &.error { border-color: #ef4444; }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 90px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  resize: vertical;
  &:focus { outline: none; border-color: #a855f7; }
`;

const PhoneRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;

const ConsentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #374151;
`;

const Checkbox = styled.input``;

const SubmitButton = styled(motion.button)`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  background: linear-gradient(90deg, #7c3aed, #a21caf);
  box-shadow: 0 10px 24px rgba(124,58,237,0.35);
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
`;

const Field = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const ErrorText = styled.span`
  font-size: 0.8rem;
  color: #ef4444;
`;

const LandingPage = () => {
  useEffect(() => {
    document.title = '카라멜에셋 태아보험';
  }, []);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    defaultValues: { phone1: '010' }
  });

  const onSubmit = async (data) => {
    const phone = `${data.phone1}-${data.phone2}-${data.phone3}`;
    try {
      await addDoc(collection(db, 'applications'), {
        applicantName: data.applicantName,
        pregnancyWeeks: data.pregnancyWeeks || '',
        phone,
        phoneParts: { p1: data.phone1, p2: data.phone2, p3: data.phone3 },
        additionalInfo: data.additionalInfo || '',
        agreed: true,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      toast.success('신청이 완료되었습니다!');
      reset({ phone1: '010' });
    } catch (e) {
      console.error(e);
      toast.error('신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <Page>
      <Card initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Title>태아보험 상담신청</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label>엄마 또는 아빠 이름</Label>
            <Input
              placeholder="엄마 또는 아빠 이름"
              {...register('applicantName', { required: '이름을 입력해주세요' })}
              className={errors.applicantName ? 'error' : ''}
            />
            {errors.applicantName && <ErrorText>{errors.applicantName.message}</ErrorText>}
          </Field>

          <Field>
            <Label>임신주수</Label>
            <Input
              type="number"
              placeholder="임신주수"
              {...register('pregnancyWeeks')}
            />
          </Field>

          <Field>
            <Label>연락처</Label>
            <PhoneRow>
              <Input placeholder="010" maxLength={3} {...register('phone1', {
                required: true,
                pattern: { value: /^\d{2,3}$/, message: '번호를 확인해주세요' }
              })} />
              <Input placeholder="0000" maxLength={4} {...register('phone2', {
                required: '번호를 입력해주세요',
                pattern: { value: /^\d{3,4}$/, message: '번호를 확인해주세요' }
              })} className={errors.phone2 ? 'error' : ''} />
              <Input placeholder="0000" maxLength={4} {...register('phone3', {
                required: '번호를 입력해주세요',
                pattern: { value: /^\d{4}$/, message: '번호를 확인해주세요' }
              })} className={errors.phone3 ? 'error' : ''} />
            </PhoneRow>
            {(errors.phone2 || errors.phone3) && (
              <ErrorText>{errors.phone2?.message || errors.phone3?.message}</ErrorText>
            )}
          </Field>

          <Field>
            <Label>문의사항</Label>
            <TextArea placeholder="문의사항을 입력하세요" {...register('additionalInfo')} />
          </Field>

          <ConsentRow>
            <Checkbox type="checkbox" {...register('agree', { required: true })} />
            <span>개인정보 수집이용 동의 (<a href="/privacy" target="_blank" rel="noreferrer">자세히보기</a>)</span>
          </ConsentRow>
          {errors.agree && <ErrorText>동의가 필요합니다</ErrorText>}

          <SubmitButton whileTap={{ scale: 0.98 }} type="submit">무료상담신청</SubmitButton>
        </Form>
      </Card>
    </Page>
  );
};

export default LandingPage;
