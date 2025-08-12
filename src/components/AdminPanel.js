import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const AdminHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AdminTitle = styled.h1`
  color: #2563eb;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const AdminSubtitle = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-weight: 500;
`;

const ApplicationsTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ApplicationRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
  
  &:hover {
    background: #f9fafb;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`;

const MobileLabel = styled.div`
  font-weight: 600;
  color: #374151;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  
  &.pending {
    background: #fef3c7;
    color: #d97706;
  }
  
  &.contacted {
    background: #dbeafe;
    color: #2563eb;
  }
  
  &.completed {
    background: #d1fae5;
    color: #059669;
  }
  
  &.cancelled {
    background: #fee2e2;
    color: #dc2626;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.contact {
    background: #2563eb;
    color: white;
    
    &:hover {
      background: #1d4ed8;
    }
  }
  
  &.complete {
    background: #059669;
    color: white;
    
    &:hover {
      background: #047857;
    }
  }
  
  &.delete {
    background: #dc2626;
    color: white;
    
    &:hover {
      background: #b91c1c;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

const AdminPanel = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const apps = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
      });
      setApplications(apps);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status });
      toast.success('상태가 업데이트되었습니다.');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('상태 업데이트 중 오류가 발생했습니다.');
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm('정말로 이 신청을 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'applications', id));
        toast.success('신청이 삭제되었습니다.');
      } catch (error) {
        console.error('Error deleting application:', error);
        toast.error('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR');
  };

  const formatPhone = (phone) => {
    return phone || '-';
  };

  if (loading) {
    return (
      <AdminContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          로딩 중...
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>관리자 패널</AdminTitle>
        <AdminSubtitle>태아보험 신청 현황 관리</AdminSubtitle>
      </AdminHeader>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatNumber>{applications.length}</StatNumber>
          <StatLabel>전체 신청</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatNumber>{getStatusCount('pending')}</StatNumber>
          <StatLabel>대기 중</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatNumber>{getStatusCount('contacted')}</StatNumber>
          <StatLabel>연락 완료</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatNumber>{getStatusCount('completed')}</StatNumber>
          <StatLabel>가입 완료</StatLabel>
        </StatCard>
      </StatsGrid>

      <ApplicationsTable>
        <TableHeader>
          <div>신청자</div>
          <div>연락처</div>
          <div>예정일</div>
          <div>예산</div>
          <div>신청일</div>
          <div>상태</div>
          <div>작업</div>
        </TableHeader>

        {applications.length === 0 ? (
          <EmptyState>
            아직 신청이 없습니다.
          </EmptyState>
        ) : (
          applications.map((app, index) => (
            <ApplicationRow
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div>
                <MobileLabel>신청자:</MobileLabel>
                {app.applicantName}
              </div>
              <div>
                <MobileLabel>연락처:</MobileLabel>
                {formatPhone(app.phone)}
              </div>
              <div>
                <MobileLabel>예정일:</MobileLabel>
                {formatDate(app.dueDate)}
              </div>
              <div>
                <MobileLabel>예산:</MobileLabel>
                {app.budget || '-'}
              </div>
              <div>
                <MobileLabel>신청일:</MobileLabel>
                {formatDate(app.createdAt)}
              </div>
              <div>
                <MobileLabel>상태:</MobileLabel>
                <StatusBadge className={app.status || 'pending'}>
                  {app.status === 'pending' && '대기'}
                  {app.status === 'contacted' && '연락완료'}
                  {app.status === 'completed' && '가입완료'}
                  {app.status === 'cancelled' && '취소'}
                </StatusBadge>
              </div>
              <div>
                <ActionButtons>
                  {app.status === 'pending' && (
                    <ActionButton
                      className="contact"
                      onClick={() => updateStatus(app.id, 'contacted')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      연락완료
                    </ActionButton>
                  )}
                  {app.status === 'contacted' && (
                    <ActionButton
                      className="complete"
                      onClick={() => updateStatus(app.id, 'completed')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      가입완료
                    </ActionButton>
                  )}
                  <ActionButton
                    className="delete"
                    onClick={() => deleteApplication(app.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    삭제
                  </ActionButton>
                </ActionButtons>
              </div>
            </ApplicationRow>
          ))
        )}
      </ApplicationsTable>
    </AdminContainer>
  );
};

export default AdminPanel;
