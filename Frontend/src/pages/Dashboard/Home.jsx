import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/UseUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstanse.cjs';
import { API_PATHS } from '../../utils/apiPaths.cjs';
import InfoCard from '../../components/Cards/InfoCard';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io"
import { addThousandsSeparator } from '../../utils/helper.cjs';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinancialOverview from '../../components/Dashboard/FinancialOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';


const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.error("Something went wrong. Please try again later. Error:", error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() =>{
    fetchDashboardData();
    return () => {}
  }, []);
  
   return (
   <DashboardLayout activeMenu="Dashboard">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
          />

          <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color="bg-green-500"
          />

          <InfoCard
          icon={<LuHandCoins />}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
          color="bg-red-500"
          />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
        />

        <FinancialOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />

        <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpense?.transactions || {}}
          onSeeMore={() => navigate("/expense")}
        />

        <Last30DaysExpenses
          data={dashboardData?.last30DaysExpense?.transactions || []}
        />
      </div>
    </div>
   </DashboardLayout>
  )
}

export default Home
