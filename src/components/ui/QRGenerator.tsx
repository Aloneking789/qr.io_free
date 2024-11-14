
// // export default QRGenerator;
// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import QRCode from 'qrcode';

// export const QRGenerator = () => {
//   const [url, setUrl] = useState('');
//   const [qrOptions, setQrOptions] = useState({
//     backgroundColor: '#FFFFFF',
//     transparentBg: false,
//     dotsColor: '#000000',
//     useGradient: false,
//     markerBorderColor: '#000000',
//     markerCenterColor: '#000000',
//     dotStyle: 'square',
//     markerStyle: 'square',
//     centerStyle: 'square',
//     logo: null,
//     removeLogoBg: false
//   });
//   const [qrCodeData, setQrCodeData] = useState('');

//   const dotStyles = [
//     'square', 'dots', 'rounded', 'classy', 'classy-rounded', 'star',
//     'horizontal', 'vertical'
//   ];

//   const markerStyles = [
//     'square', 'dot', 'circle', 'rounded', 'folded', 'pointed', 'extra-rounded'
//   ];

//   const centerStyles = [
//     'square', 'circle', 'star', 'diamond', 'cross', 'flower', 'x', 'heart'
//   ];

//   // Create a canvas element to draw the QR code with custom styles
//   const createStyledQRCode = async (text, options) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
    
//     // Generate basic QR code data
//     const qrData = await QRCode.create(text, {
//       errorCorrectionLevel: 'H',
//     });
    
//     const moduleCount = qrData.modules.size;
//     const moduleSize = 8; // Size of each QR code module
//     const margin = moduleSize * 4; // Margin around the QR code
    
//     canvas.width = moduleCount * moduleSize + 2 * margin;
//     canvas.height = moduleCount * moduleSize + 2 * margin;
    
//     // Set background
//     ctx.fillStyle = options.transparentBg ? 'transparent' : options.backgroundColor;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
//     // Draw QR code modules with custom styles
//     for (let row = 0; row < moduleCount; row++) {
//       for (let col = 0; col < moduleCount; col++) {
//         if (qrData.modules.get(row, col)) {
//           const x = col * moduleSize + margin;
//           const y = row * moduleSize + margin;
          
//           ctx.fillStyle = options.dotsColor;
          
//           // Apply different styles based on module position and selected style
//           const isMarker = (row < 7 && col < 7) || 
//                           (row < 7 && col >= moduleCount - 7) || 
//                           (row >= moduleCount - 7 && col < 7);
          
//           if (isMarker) {
//             // Draw marker patterns
//             switch (options.markerStyle) {
//               case 'circle':
//                 ctx.beginPath();
//                 ctx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2, 0, 2 * Math.PI);
//                 ctx.fill();
//                 break;
//               case 'rounded':
//                 ctx.beginPath();
//                 ctx.roundRect(x, y, moduleSize, moduleSize, moduleSize/3);
//                 ctx.fill();
//                 break;
//               default:
//                 ctx.fillRect(x, y, moduleSize, moduleSize);
//             }
//           } else {
//             // Draw regular modules
//             switch (options.dotStyle) {
//               case 'dots':
//                 ctx.beginPath();
//                 ctx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2.5, 0, 2 * Math.PI);
//                 ctx.fill();
//                 break;
//               case 'rounded':
//                 ctx.beginPath();
//                 ctx.roundRect(x, y, moduleSize, moduleSize, moduleSize/3);
//                 ctx.fill();
//                 break;
//               default:
//                 ctx.fillRect(x, y, moduleSize, moduleSize);
//             }
//           }
//         }
//       }
//     }
    
//     return canvas.toDataURL('image/png');
//   };

//   const generateQR = async () => {
//     if (!url) return;

//     try {
//       const qrData = await createStyledQRCode(url, qrOptions);
//       setQrCodeData(qrData);
//     } catch (err) {
//       console.error('Error generating QR code:', err);
//     }
//   };

//   // Regenerate QR code whenever options change
//   useEffect(() => {
//     if (url) {
//       generateQR();
//     }
//   }, [qrOptions]);

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setQrOptions({
//           ...qrOptions,
//           logo: e.target.result
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <h2 className="text-2xl font-bold">Custom QR Code Generator</h2>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             {/* URL Input */}
//             <div>
//               <Label>Enter URL</Label>
//               <div className="flex gap-2">
//                 <Input 
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   placeholder="https://example.com"
//                 />
//                 <Button onClick={generateQR}>Generate QR</Button>
//               </div>
//             </div>

//             <Tabs defaultValue="colors">
//               <TabsList>
//                 <TabsTrigger value="colors">Colors</TabsTrigger>
//                 <TabsTrigger value="style">Style</TabsTrigger>
//                 <TabsTrigger value="logo">Logo</TabsTrigger>
//               </TabsList>

//               <TabsContent value="colors" className="space-y-4">
//                 <div>
//                   <Label>Background Color</Label>
//                   <div className="flex items-center gap-4">
//                     <Input 
//                       type="color"
//                       value={qrOptions.backgroundColor}
//                       onChange={(e) => setQrOptions({
//                         ...qrOptions,
//                         backgroundColor: e.target.value
//                       })}
//                     />
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         checked={qrOptions.transparentBg}
//                         onCheckedChange={(checked) => setQrOptions({
//                           ...qrOptions,
//                           transparentBg: checked
//                         })}
//                       />
//                       <Label>Transparent Background</Label>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <Label>Dots Color</Label>
//                   <div className="flex items-center gap-4">
//                     <Input 
//                       type="color"
//                       value={qrOptions.dotsColor}
//                       onChange={(e) => setQrOptions({
//                         ...qrOptions,
//                         dotsColor: e.target.value
//                       })}
//                     />
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="style" className="space-y-4">
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <Label>Dot Style</Label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {dotStyles.map(style => (
//                         <Button
//                           key={style}
//                           variant={qrOptions.dotStyle === style ? 'default' : 'outline'}
//                           size="sm"
//                           onClick={() => setQrOptions({
//                             ...qrOptions,
//                             dotStyle: style
//                           })}
//                         >
//                           {style}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <Label>Marker Style</Label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {markerStyles.map(style => (
//                         <Button
//                           key={style}
//                           variant={qrOptions.markerStyle === style ? 'default' : 'outline'}
//                           size="sm"
//                           onClick={() => setQrOptions({
//                             ...qrOptions,
//                             markerStyle: style
//                           })}
//                         >
//                           {style}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <Label>Center Style</Label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {centerStyles.map(style => (
//                         <Button
//                           key={style}
//                           variant={qrOptions.centerStyle === style ? 'default' : 'outline'}
//                           size="sm"
//                           onClick={() => setQrOptions({
//                             ...qrOptions,
//                             centerStyle: style
//                           })}
//                         >
//                           {style}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="logo" className="space-y-4">
//                 <div>
//                   <Label>Upload Logo</Label>
//                   <Input 
//                     type="file"
//                     accept="image/*"
//                     onChange={handleLogoUpload}
//                   />
//                   <div className="flex items-center gap-2 mt-2">
//                     <Switch
//                       checked={qrOptions.removeLogoBg}
//                       onCheckedChange={(checked) => setQrOptions({
//                         ...qrOptions,
//                         removeLogoBg: checked
//                       })}
//                     />
//                     <Label>Remove Logo Background</Label>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>

//             {/* QR Code Preview */}
//             {qrCodeData && (
//               <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
//                 <img src={qrCodeData} alt="Generated QR Code" className="w-64 h-64" />
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // export default QRGenerator;

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import QRCode from 'qrcode';

export const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrOptions, setQrOptions] = useState({
    backgroundColor: '#FFFFFF',
    transparentBg: false,
    dotsColor: '#000000',
    useGradient: false,
    markerBorderColor: '#000000',
    markerCenterColor: '#000000',
    dotStyle: 'square',
    markerStyle: 'square',
    centerStyle: 'square',
    logo: '' as string | ArrayBuffer | null,
    removeLogoBg: false
  });
  const [qrCodeData, setQrCodeData] = useState('');
  
  const dotStyles = [
    'square', 'dots', 'rounded', 'classy', 'classy-rounded', 'star',
    'horizontal', 'vertical'
  ];

  const markerStyles = [
    'square', 'dot', 'circle', 'rounded', 'folded', 'pointed', 'extra-rounded'
  ];

  const centerStyles = [
    'square', 'circle', 'star', 'diamond', 'cross', 'flower', 'x', 'heart'
  ];

  // Create a canvas element to draw the QR code with custom styles
  interface QROptions {
    backgroundColor: string;
    transparentBg: boolean;
    dotsColor: string;
    useGradient: boolean;
    markerBorderColor: string;
    markerCenterColor: string;
    dotStyle: string;
    markerStyle: string;
    centerStyle: string;
    logo: string | ArrayBuffer | null;
    removeLogoBg: boolean;
  }

  const createStyledQRCode = async (text: string, options: QROptions): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }
    
    // Generate basic QR code data
    const qrData = await QRCode.create(text, {
      errorCorrectionLevel: 'H',
    });
    
    const moduleCount = qrData.modules.size;
    const moduleSize = 8; // Size of each QR code module
    const margin = moduleSize * 4; // Margin around the QR code
    
    canvas.width = moduleCount * moduleSize + 2 * margin;
    canvas.height = moduleCount * moduleSize + 2 * margin;
    
    // Set background
    ctx.fillStyle = options.transparentBg ? 'transparent' : options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw QR code modules with custom styles
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qrData.modules.get(row, col)) {
          const x = col * moduleSize + margin;
          const y = row * moduleSize + margin;
          
          ctx.fillStyle = options.dotsColor;
          
          // Apply different styles based on module position and selected style
          const isMarker = (row < 7 && col < 7) || 
                          (row < 7 && col >= moduleCount - 7) || 
                          (row >= moduleCount - 7 && col < 7);
          
          if (isMarker) {
            // Draw marker patterns
            switch (options.markerStyle) {
              case 'circle':
                ctx.beginPath();
                ctx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2, 0, 2 * Math.PI);
                ctx.fill();
                break;
              case 'rounded':
                ctx.beginPath();
                ctx.roundRect(x, y, moduleSize, moduleSize, moduleSize/3);
                ctx.fill();
                break;
              default:
                ctx.fillRect(x, y, moduleSize, moduleSize);
            }
          } else {
            // Draw regular modules
            switch (options.dotStyle) {
              case 'dots':
                ctx.beginPath();
                ctx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2.5, 0, 2 * Math.PI);
                ctx.fill();
                break;
              case 'rounded':
                ctx.beginPath();
                ctx.roundRect(x, y, moduleSize, moduleSize, moduleSize/3);
                ctx.fill();
                break;
              default:
                ctx.fillRect(x, y, moduleSize, moduleSize);
            }
          }
        }
      }
    }
    
    return canvas.toDataURL('image/png');
  };

  const generateQR = async () => {
    if (!url) return;

    try {
      const qrData = await createStyledQRCode(url, qrOptions);
      setQrCodeData(qrData);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  // Regenerate QR code whenever options change
  useEffect(() => {
    if (url) {
      generateQR();
    }
  }, [qrOptions]);

  interface FileReaderEventTarget extends EventTarget {
    result: string;
  }

  interface FileReaderEvent extends ProgressEvent {
    target: FileReaderEventTarget;
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setQrOptions({
          ...qrOptions,
          logo: e.target?.result ?? null
        });
      };
      reader.readAsDataURL(file);
    }
  };

  interface DownloadQRCodeProps {
    format: 'svg' | 'png' | 'jpg';
  }

  const downloadQRCode = (format: DownloadQRCodeProps['format']): void => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }
    const img = new Image();
    img.src = qrCodeData;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(`image/${format}`);
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `qr-code.${format}`;
      link.click();
    };
  };

  const Logo = () => (
    <div className="fixed top-2 sm:top-4 md:top-6 left-2 sm:left-4 md:left-6 z-50 transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-md sm:blur-lg" />
          <div className="relative bg-white/10 rounded-full p-0.5 sm:p-1 backdrop-blur-sm ring-1 ring-white/20 shadow-lg">
            <img
              src="/elite.png"
              alt="logo"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-contain filter brightness-110 contrast-125"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => {
    return (
      <footer className="bg-gray-800 w-full text-white py-6 mt-8  fixed bottom-0">
        <div className="  px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Left side: Links */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-0">
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </div>
  
            {/* Right side: Copyright */}
            <div className="text-center sm:text-right">
              <p className="text-sm">&copy; 2024 Elite. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  return (
    <>
    <div className="max-w-4xl mx-auto p-4">

        <Logo />
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Custom QR Code Generator</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* URL Input */}
            <div>
              <Label>Enter URL</Label>
              <div className="flex gap-2">
                <Input 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                />
                <Button onClick={generateQR}>Generate QR</Button>
              </div>
            </div>

            <Tabs defaultValue="colors">
              <TabsList>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="logo">Logo</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <div>
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="color"
                      value={qrOptions.backgroundColor}
                      onChange={(e) => setQrOptions({
                        ...qrOptions,
                        backgroundColor: e.target.value
                      })}
                    />
                    <Input
                      type="text"
                      value={qrOptions.backgroundColor}
                      onChange={(e) => setQrOptions({
                        ...qrOptions,
                        backgroundColor: e.target.value
                      })}
                      className="w-24"
                      placeholder="#FFFFFF"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={qrOptions.transparentBg}
                      onCheckedChange={(checked) => setQrOptions({
                        ...qrOptions,
                        transparentBg: checked
                      })}
                    />
                    <Label>Transparent Background</Label>
                  </div>
                </div>

                <div>
                  <Label>Dots Color</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="color"
                      value={qrOptions.dotsColor}
                      onChange={(e) => setQrOptions({
                        ...qrOptions,
                        dotsColor: e.target.value
                      })}
                    />
                    <Input
                      type="text"
                      value={qrOptions.dotsColor}
                      onChange={(e) => setQrOptions({
                        ...qrOptions,
                        dotsColor: e.target.value
                      })}
                      className="w-24"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Dot Style</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {dotStyles.map(style => (
                        <Button
                          key={style}
                          variant={qrOptions.dotStyle === style ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setQrOptions({
                            ...qrOptions,
                            dotStyle: style
                          })}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Marker Style</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {markerStyles.map(style => (
                        <Button
                          key={style}
                          variant={qrOptions.markerStyle === style ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setQrOptions({
                            ...qrOptions,
                            markerStyle: style
                          })}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Center Style</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {centerStyles.map(style => (
                        <Button
                          key={style}
                          variant={qrOptions.centerStyle === style ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setQrOptions({
                            ...qrOptions,
                            centerStyle: style
                          })}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logo" className="space-y-4">
                <div>
                  <Label>Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* QR Code Preview */}
            {qrCodeData && (
              <div className="mt-4 justify-center place-items-center">
                <img src={qrCodeData} alt="QR Code" />
              </div>
            )}

            {/* Download Buttons */}
            {qrCodeData && (
              <div className="space-x-4 mt-4 flex justify-center pb-20">
                <Button onClick={() => downloadQRCode('svg')}>Download SVG</Button>
                <Button onClick={() => downloadQRCode('png')}>Download PNG</Button>
                <Button onClick={() => downloadQRCode('jpg')}>Download JPG</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
    <div>
    <Footer />
    </div>
   

    </>

  
  );
};

// export default QRGenerator;
