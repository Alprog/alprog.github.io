
var diagram = new Diagram();

diagram.addGrid();

class Custom
{
	render(renderer)
	{
		for (var i = 0; i <= 10; i++)
        {
            renderer.drawLine(new Vector4(0,i*10,0,1), new Vector4(100,i*10,0,1));
            renderer.drawLine(new Vector4(i*10,0,0,1), new Vector4(i*10,100,0,1));		
        }
        renderer.drawLine(new Vector4(0,0,0,1), new Vector4(60,30,0,1), "red", 3);
        renderer.drawLine(new Vector4(60,30,0,1), new Vector4(40,70,0,1), "green", 3);
        renderer.drawLine(new Vector4(40,70,0,1), new Vector4(100,100,0,1), "blue", 3);
        
        renderer.drawLine(new Vector4(150,0,0,1), new Vector4(150,150,0,1));
        renderer.drawLine(new Vector4(0,150,0,1), new Vector4(150,150,0,1));
        renderer.drawLine(new Vector4(150,0,150,1), new Vector4(150,150,150,1));
        renderer.drawLine(new Vector4(0,150,150,1), new Vector4(150,150,150,1));
    
        renderer.drawLine(new Vector4(0,150,150,1), new Vector4(0,0,150,1));
        renderer.drawLine(new Vector4(150,0,150,1), new Vector4(0,0,150,1));
        
        renderer.drawLine(new Vector4(0,150,0,1), new Vector4(0,150,150,1));
        renderer.drawLine(new Vector4(150,150,0,1), new Vector4(150,150,150,1));
        renderer.drawLine(new Vector4(150,0,0,1), new Vector4(150,0,150,1));
	}
}

diagram.objects.push(new Custom());