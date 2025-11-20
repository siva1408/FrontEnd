import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useTimerStore from '../../store/timerStore';
import { format, subDays } from 'date-fns';

const ProductivityChart = ({ days = 7 }) => {
  const sessions = useTimerStore((state) => state.sessions);

  // Generate data for the last N days
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');

    const daySessions = sessions.filter((session) => {
      const sessionDate = format(new Date(session.completedAt), 'yyyy-MM-dd');
      return sessionDate === dateStr && session.mode === 'work';
    });

    const focusMinutes = daySessions.reduce(
      (acc, session) => acc + session.duration,
      0
    );

    data.push({
      date: format(date, 'MMM dd'),
      minutes: focusMinutes,
      sessions: daySessions.length,
    });
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Productivity Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
          <XAxis
            dataKey="date"
            className="text-gray-600 dark:text-gray-400"
          />
          <YAxis className="text-gray-600 dark:text-gray-400" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductivityChart;
