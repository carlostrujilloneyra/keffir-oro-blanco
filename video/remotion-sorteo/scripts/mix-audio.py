import os
S=os.path.join(os.path.dirname(__file__),'..','assets','sfx')
M=[[0,0],[2.36,2.69],[4.47,4.75],[7.99,8.12],[10.3,10.42],[12.4,12.55],[12.8,12.95],
   [39.56,21.3],[39.8,21.88],[41.4,23.75],[42.78,24.98],[43.9,26.22],[45.48,28.11],[46.9,29.54],[48.5,31.25],[51.19,34.0],[52.9,35.6],[54.7,37.4]]
def new(o):
    for i in range(len(M)-1):
        (n0,o0),(n1,o1)=M[i],M[i+1]
        if o0<=o<=o1 and o1>o0: return n0+(o-o0)*(n1-n0)/(o1-o0)
    return None
old=[('brillo-misterio',2.6,.35),('sello',2.8,.4),('pop',3.25,.3),('woosh',4.45,.3),
('woosh',8.0,.22),('pop',8.15,.2),('pop',8.47,.2),('pop',8.82,.2),('sello',8.72,.3),('pop',10.45,.28),('woosh',12.55,.3),
('ticket',23.75,.42),('ticket',25.05,.38),('ticket',25.5,.38),('campanita-tienda',26.25,.28),('woosh',27.7,.28),
('pop',28.5,.28),('pop',29.55,.38),('woosh',30.95,.32),('brillo-misterio',31.3,.4),('sello',34.0,.45),('woosh',35.75,.3),('pop',36.0,.35),('campanita-tienda',36.25,.3)]
ev=[(n,round(new(t),3),v) for n,t,v in old if new(t) is not None]
ev+=[('splash',12.95,.28),('splash',13.2,.26),('pop',14.0,.2),('pop',14.2,.2),('sello',15.75,.45),('brillo-misterio',15.8,.3),('woosh',17.45,.18),('pop',19.8,.35),('brillo-misterio',19.82,.25),('pop',18.6,.2),
('woosh',21.4,.25),('pop',21.95,.2),('pop',22.1,.2),('pop',22.25,.2),
('woosh',22.95,.25),('splash',23.1,.3),('woosh',23.85,.25),('splash',24.0,.3),('woosh',24.9,.25),('splash',25.05,.3),
('woosh',26.4,.25),('sello',27.5,.3),('sello',28.2,.3),('woosh',28.9,.25),('sello',29.3,.35),('sello',30.1,.35),('pop',31.85,.3),('brillo-misterio',33.84,.35),('pop',33.84,.3),
('woosh',34.75,.25),('sello',35.3,.3),('woosh',36.8,.2),('sello',36.85,.4),('pop',37.05,.3),('campanita-tienda',38.42,.25),('woosh',39.4,.3)]
DUR=54.9
inp=f'-i {S}/voz-sorteo-teaser-v3.mp3 -stream_loop -1 -i {S}/musica.mp3 '
fl=[]; labs=[]
for i,(n,t,v) in enumerate(ev):
    inp+=f'-i {S}/{n}.mp3 '
    d=int(t*1000); fl.append(f'[{i+2}:a]volume={v},adelay={d}|{d}[s{i}]'); labs.append(f'[s{i}]')
fl.append(f'[1:a]atrim=0:{DUR},volume=0.4,afade=t=in:st=2.0:d=1.0,afade=t=out:st={DUR-2.5}:d=2.5[m0]')
fl.append("[0:a]volume=1.2,acompressor=threshold=0.12:ratio=2.5:attack=5:release=120,asplit=3[v1][vsc][vsc2]")
fl.append('[m0][vsc]sidechaincompress=threshold=0.02:ratio=12:attack=15:release=400[m]')
fl.append(''.join(labs)+f'amix=inputs={len(ev)}:normalize=0[sx]')
fl.append('[sx][vsc2]sidechaincompress=threshold=0.03:ratio=4:attack=10:release=250[sxd]')
fl.append(f'[v1][m][sxd]amix=inputs=3:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95,loudnorm=I=-14:TP=-1:LRA=9[a]')
print(f'ffmpeg -y -v error {inp} -filter_complex "{";".join(fl)}" -map "[a]" -ac 2 -ar 48000 out/mix.wav')
