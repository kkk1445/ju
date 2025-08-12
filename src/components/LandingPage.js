import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #fdf2ff 0%, #fff 40%, #fafafa 100%);
`;

const Container = styled.div`
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
`;

const Hero = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #d8b4fe 0%, #f0abfc 40%, #fde1ff 100%);
`;

const HeroInner = styled.div`
  position: relative;
  width: 100%;
  /* aspect-ratio는 동적으로 설정됨 */
  max-height: 620px;
`;

const BannerImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* 이미지 잘림 방지 */
  background: linear-gradient(135deg, #d8b4fe 0%, #f0abfc 40%, #fde1ff 100%);
`;

const FallbackHero = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #5b21b6;
  text-align: center;
  padding: 1.25rem;
`;

const FallbackTitle = styled.h1`
  font-size: clamp(1.6rem, 6vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.02em;
`;

const Wave = styled.svg`
  display: block;
  width: 100%;
  height: 56px;
  margin-top: -1px;
  fill: #fff;
`;

const CardWrap = styled.div`
  width: 100%;
  padding: 0 16px 48px;
  margin-top: -24px; /* contain으로 줄임 */
  @media (min-width: 640px) {
    margin-top: -36px;
  }
`;

const Card = styled(motion.div)`
  width: 100%;
  max-width: 740px;
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  margin: 0 auto;
  box-shadow: 0 18px 50px rgba(96, 14, 167, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.15);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
  color: #2b2240;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 12px;
  font-size: 1rem;
  background: #ffffff;
  transition: border-color .2s ease, box-shadow .2s ease;
  &:focus { outline: none; border-color: #a855f7; box-shadow: 0 0 0 4px rgba(168, 85, 247, .15); }
  &.error { border-color: #ef4444; }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  font-size: 1rem;
  resize: vertical;
  background: #ffffff;
  transition: border-color .2s ease, box-shadow .2s ease;
  &:focus { outline: none; border-color: #a855f7; box-shadow: 0 0 0 4px rgba(168, 85, 247, .15); }
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
  border-radius: 14px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  background: linear-gradient(90deg, #7c3aed, #a21caf);
  box-shadow: 0 14px 30px rgba(124, 58, 237, 0.35);
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 700;
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

  const [bannerError, setBannerError] = useState(false);
  const [heroRatio, setHeroRatio] = useState('3 / 4');
  const [srcIndex, setSrcIndex] = useState(0);
  const candidates = ['/banner.jpg', '/banner.jpeg', '/banner.png', '/banner.webp'];

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
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

  const handleError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex((i) => i + 1);
    } else {
      setBannerError(true);
    }
  };

  return (
    <Page>
      <Container>
        <Hero>
          <HeroInner style={{ aspectRatio: heroRatio }}>
            {!bannerError && (
              <BannerImg
                key={candidates[srcIndex]}
                src={candidates[srcIndex]}
                alt="태아보험 프로모션 배너"
                onError={handleError}
                onLoad={(e) => {
                  const w = e.currentTarget.naturalWidth || 3;
                  const h = e.currentTarget.naturalHeight || 4;
                  setHeroRatio(`${w} / ${h}`);
                }}
              />
            )}
            {bannerError && (
              <FallbackHero>
                <FallbackTitle>우리 아이 태아보험 – 내 아이의 생애 첫 보험</FallbackTitle>
              </FallbackHero>
            )}
          </HeroInner>
          <Wave viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,32L80,37.3C160,43,320,53,480,50.7C640,48,800,32,960,24C1120,16,1280,16,1360,16L1440,16L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
          </Wave>
        </Hero>
        <CardWrap>
          <Card initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Title>태아보험 상담신청</Title>
            <Subtitle>간단한 정보만 남기시면 전문가가 빠르게 연락드립니다.</Subtitle>
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
                <Label>임신주수 (선택)</Label>
                <Input
                  type="number"
                  placeholder="예: 20"
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
                <Label>문의사항 (선택)</Label>
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
        </CardWrap>
      </Container>
    </Page>
  );
};

export default LandingPage;
