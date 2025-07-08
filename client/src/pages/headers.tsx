import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Turnstile } from "@marsidev/react-turnstile";
import { ArrowLeft, Monitor, Globe, Server, Shield } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeadersResponse {
  requestHeaders: Record<string, string>;
  deviceInfo: {
    userAgent: string;
    ip: string;
    method: string;
    url: string;
    protocol: string;
    httpVersion: string;
    timestamp: string;
  };
  responseHeaders: Record<string, string>;
}

export default function Headers() {
  const [isVerified, setIsVerified] = useState(false);
  const { data, isLoading, error } = useQuery<HeadersResponse>({
    queryKey: ["/api/headers"],
    refetchInterval: 5000, // Refresh every 5 seconds
    enabled: isVerified, // Only fetch when verified
  });

  // If not verified, show Turnstile verification screen
  if (!isVerified) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Security Verification</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Please verify you're human to access the HTTP Headers tool
                </p>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Turnstile
                  siteKey="1x00000000000000000000AA" // Demo key - replace with your actual key
                  onSuccess={() => setIsVerified(true)}
                  onError={() => setIsVerified(false)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            HTTP <span className="gradient-text">Headers</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Real-time display of incoming HTTP request headers
          </p>
          <Link href="/">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="request" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="request" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Request Headers
            </TabsTrigger>
            <TabsTrigger value="device" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Device Info
            </TabsTrigger>
            <TabsTrigger value="response" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Response Headers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="request" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">
                  Request Headers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="header-item rounded-lg p-4 border-l-4 border-primary">
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-destructive mb-4">Failed to load headers</p>
                    <p className="text-muted-foreground">{error.message}</p>
                  </div>
                ) : data?.requestHeaders && Object.keys(data.requestHeaders).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(data.requestHeaders).map(([key, value]) => (
                      <div key={key} className="header-item rounded-lg p-4 border-l-4 border-primary">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="syntax-highlight font-semibold text-primary">{key}:</span>
                          <span className="text-muted-foreground break-all">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No request headers available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="device" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">
                  Device Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="header-item rounded-lg p-4 border-l-4 border-primary">
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-destructive mb-4">Failed to load device info</p>
                    <p className="text-muted-foreground">{error.message}</p>
                  </div>
                ) : data?.deviceInfo ? (
                  <div className="space-y-3">
                    <div className="header-item rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="syntax-highlight font-semibold text-primary">IP Address:</span>
                        <span className="text-muted-foreground break-all">{data.deviceInfo.ip}</span>
                      </div>
                    </div>
                    <div className="header-item rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="syntax-highlight font-semibold text-primary">Method:</span>
                        <span className="text-muted-foreground break-all">{data.deviceInfo.method}</span>
                      </div>
                    </div>
                    <div className="header-item rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="syntax-highlight font-semibold text-primary">Protocol:</span>
                        <span className="text-muted-foreground break-all">{data.deviceInfo.protocol}</span>
                      </div>
                    </div>
                    <div className="header-item rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="syntax-highlight font-semibold text-primary">HTTP Version:</span>
                        <span className="text-muted-foreground break-all">{data.deviceInfo.httpVersion}</span>
                      </div>
                    </div>
                    <div className="header-item rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="syntax-highlight font-semibold text-primary">Timestamp:</span>
                        <span className="text-muted-foreground break-all">{new Date(data.deviceInfo.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="header-item rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex flex-col gap-2">
                        <span className="syntax-highlight font-semibold text-primary">User Agent:</span>
                        <span className="text-muted-foreground break-all text-sm">{data.deviceInfo.userAgent}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No device information available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">
                  Response Headers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="header-item rounded-lg p-4 border-l-4 border-primary">
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-destructive mb-4">Failed to load response headers</p>
                    <p className="text-muted-foreground">{error.message}</p>
                  </div>
                ) : data?.responseHeaders && Object.keys(data.responseHeaders).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(data.responseHeaders).map(([key, value]) => (
                      <div key={key} className="header-item rounded-lg p-4 border-l-4 border-primary">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="syntax-highlight font-semibold text-primary">{key}:</span>
                          <span className="text-muted-foreground break-all">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No response headers available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
