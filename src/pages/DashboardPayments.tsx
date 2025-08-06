import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/SidebarNav';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, Check } from 'lucide-react';

const DashboardPayments = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mock payment data - in a real app, this would come from your database
  const payments = [
    {
      id: "PAY_001",
      course: "The Founder Mindset",
      amount: 25000,
      currency: "NGN",
      date: "2024-01-15",
      status: "completed",
      reference: "REF_20240115_001"
    },
    {
      id: "PAY_002",
      course: "Sales Psychology",
      amount: 30000,
      currency: "NGN",
      date: "2024-01-10",
      status: "completed",
      reference: "REF_20240110_002"
    },
    {
      id: "PAY_003",
      course: "Fundraising Fundamentals",
      amount: 35000,
      currency: "NGN",
      date: "2024-01-05",
      status: "completed",
      reference: "REF_20240105_003"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SidebarNav />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Payment History
                </h1>
                <p className="text-muted-foreground">
                  View your course purchases and payment receipts
                </p>
              </div>

              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-naira">{formatPrice(totalSpent)}</div>
                    <p className="text-xs text-muted-foreground">Lifetime investment</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Purchased</CardTitle>
                    <Check className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{payments.length}</div>
                    <p className="text-xs text-muted-foreground">Successfully purchased</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Purchase</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatDate(payments[0]?.date || '')}</div>
                    <p className="text-xs text-muted-foreground">Most recent transaction</p>
                  </CardContent>
                </Card>
              </div>

              {/* Payment History Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{payment.course}</h3>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              {payment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Ref: {payment.reference}</span>
                            <span>{formatDate(payment.date)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xl font-bold text-naira">{formatPrice(payment.amount)}</div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPayments;