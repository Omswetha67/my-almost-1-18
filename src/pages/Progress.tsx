import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ChartConfiguration, registerables } from "chart.js";

Chart.register(...registerables);

const Progress = () => {
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartInstance = useRef<Chart | null>(null);
  const barChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Create Pie Chart
    if (pieChartRef.current) {
      // Destroy existing chart if it exists
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      const pieCtx = pieChartRef.current.getContext('2d');
      if (pieCtx) {
        const pieConfig: ChartConfiguration = {
          type: 'pie',
          data: {
            labels: ['Programming', 'Communication', 'Leadership', 'Design', 'Analytics'],
            datasets: [{
              data: [35, 20, 15, 20, 10],
              backgroundColor: [
                'hsl(217, 91%, 60%)',
                'hsl(217, 91%, 70%)',
                'hsl(45, 93%, 47%)',
                'hsl(142, 76%, 36%)',
                'hsl(38, 92%, 50%)'
              ],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  font: {
                    size: 12
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.parsed}%`;
                  }
                }
              }
            }
          }
        };
        
        pieChartInstance.current = new Chart(pieCtx, pieConfig);
      }
    }

    // Create Bar Chart
    if (barChartRef.current) {
      // Destroy existing chart if it exists
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      const barCtx = barChartRef.current.getContext('2d');
      if (barCtx) {
        const barConfig: ChartConfiguration = {
          type: 'bar',
          data: {
            labels: ['Programming', 'Communication', 'Leadership', 'Design', 'Analytics'],
            datasets: [
              {
                label: 'Skills',
                data: [8, 4, 3, 5, 2],
                backgroundColor: 'hsl(217, 91%, 60%)',
                borderColor: 'hsl(217, 91%, 50%)',
                borderWidth: 1
              },
              {
                label: 'Projects',
                data: [5, 2, 1, 3, 1],
                backgroundColor: 'hsl(45, 93%, 47%)',
                borderColor: 'hsl(45, 93%, 37%)',
                borderWidth: 1
              },
              {
                label: 'Certificates',
                data: [3, 1, 2, 2, 1],
                backgroundColor: 'hsl(142, 76%, 36%)',
                borderColor: 'hsl(142, 76%, 26%)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  padding: 20,
                  font: {
                    size: 12
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        };
        
        barChartInstance.current = new Chart(barCtx, barConfig);
      }
    }

    // Cleanup function
    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header with Back Button */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              ← Back to Home
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Progress Dashboard
            </h1>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart - Skill Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary text-center">
                  Skill Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <canvas
                    ref={pieChartRef}
                    id="skillPieChart"
                    className="max-w-full max-h-full"
                  ></canvas>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart - Progress by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary text-center">
                  Progress by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <canvas
                    ref={barChartRef}
                    id="progressBarChart"
                    className="max-w-full max-h-full"
                  ></canvas>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights and Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-primary mb-2">💪 Strong Areas</h3>
                  <p className="text-sm text-muted-foreground">
                    You excel in <strong>Programming</strong> with 8 skills and 5 projects. 
                    Keep building on this foundation!
                  </p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📈 Growth Areas</h3>
                  <p className="text-sm text-muted-foreground">
                    Consider improving <strong>Communication</strong> and <strong>Leadership</strong> skills. 
                    These are highly valued by employers.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">🎯 Next Steps</h3>
                  <p className="text-sm text-muted-foreground">
                    Add more <strong>certificates</strong> in Analytics and Design 
                    to boost your portfolio credibility.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-primary mb-2">📊 Portfolio Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">22</div>
                    <div className="text-sm text-muted-foreground">Total Skills</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">9</div>
                    <div className="text-sm text-muted-foreground">Certificates</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Profile Complete</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;