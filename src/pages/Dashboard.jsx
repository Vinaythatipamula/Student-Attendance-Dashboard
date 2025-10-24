import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui';
import { Users, BarChart3, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);

  const presentCount = students.filter(student => student.isPresent).length;
  const totalCount = students.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const quickActions = [
    {
      title: 'Mark Attendance',
      description: 'Take attendance for today\'s class',
      icon: <Users className="h-8 w-8 text-blue-600" />,
      link: '/students',
      color: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      title: 'View Summary',
      description: 'Check attendance reports and analytics',
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      link: '/summary',
      color: 'bg-green-50 hover:bg-green-100',
    },
  ];

  const stats = [
    {
      title: 'Total Students',
      value: totalCount,
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Present Today',
      value: presentCount,
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Absent Today',
      value: totalCount - presentCount,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Attendance Rate',
      value: `${attendancePercentage}%`,
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'Teacher'}!
        </h1>
        <p className="text-blue-100">
          Manage your student attendance efficiently with our dashboard
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-4`}>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.link}>
            <Card className={`${action.color} transition-colors duration-200 cursor-pointer`}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Attendance marked for today</span>
            </div>
            <span className="text-sm text-gray-500">Just now</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Class started - Grade 10A</span>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Weekly report generated</span>
            </div>
            <span className="text-sm text-gray-500">Yesterday</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;













